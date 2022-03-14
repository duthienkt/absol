import Heap from "../DataStructure/Heap";


var TARGET = 0;
var RULE = 1;
var PASSED = 2;
var LENGTH = 3;
var TRACK = 4;

/***
 * @param {string} target
 * @param {Rule|null} rule
 * @param {number} passed
 * @param {number} length
 * @param {[]} track
 *
 * @returns {*[]}
 */
function mkItem(target, rule, passed, length, track) {
    return [target, rule, passed, length, track];
}

function indexingItem(item) {
    return item[TARGET] + '*' + item[PASSED] + '*' + item[LENGTH];
}

/****
 *
 * @param {DPParser} parser
 * @param {string || []} source
 * @param {string} target
 * @constructor
 */
function DPParseInstance(parser, source, target) {
    this.target = target;
    this.parser = parser;
    this.targets = parser.targets;
    this.rules = parser.rules;
    this.tokenTypes = parser.tokenizer.types;
    this.error = null;
    if (typeof source === "string"){
        this.tokens = parser.tokenizer.tokenize(source).filter(function (tk) {
            return tk.type !== 'skip';
        });
    }
    else if (source instanceof Array){
        this.tokens = source
    }
    else {
        throw new Error("Invalid source, source must be string or array of token");
    }

    this.tokenIdx = 0;
    this.priQueue = new Heap(this._cmpFunction);
    this.maxSize = 0;
    this.expectedArr = [];
    this.parsedNode = null;
    this.ast = null;
    this._dp();
    this._trackBack();
    if (this.parsedNode) {
        this._calcAST();
    }
    else {
        this._findError();
    }

}

DPParseInstance.prototype._dp = function () {
    while (this.tokenIdx < this.tokens.length) {
        this._nextToken();
    }
};


DPParseInstance.prototype._cmpFunction = function (a, b) {
    return a[1] - b[1];
};


DPParseInstance.prototype._nextToken = function () {
    var idx = this.tokenIdx++;
    var token = this.tokens[idx];

    this.priQueue.push(mkItem('.' + token.type, null, 1, 1, [null, token]));
    this.priQueue.push(mkItem('_' + token.content, null, 1, 1, [null, token]));
    var expected = {};
    var pushed = {};
    var itemIndex;
    this.expectedArr.push(expected);
    var cur, next;
    var i, j, rule;

    var prevExpectedList, prevRule;
    var prevExpectedItem;


    while (this.priQueue.size() > 0) {
        this.maxSize = Math.max(this.maxSize, this.priQueue.size());
        cur = this.priQueue.pop();

        for (i = 0; i < this.rules.length; ++i) {
            rule = this.rules[i];
            if (rule.elements[0] === cur[TARGET]) {
                if (rule.elements.length === 1) {
                    next = mkItem(rule.target, rule, cur[PASSED], cur[LENGTH], [null, cur]);
                    itemIndex = indexingItem(next);
                    if (pushed) {
                        pushed[itemIndex] = true;
                        this.priQueue.push(next);
                    }
                    expected['^'] = expected['^'] || [];
                    expected['^'].push(next);
                }
                else {
                    next = mkItem(rule.target, rule, 1, cur[LENGTH], [null, cur]);
                    expected[rule.elements[1]] = expected[rule.elements[1]] || [];
                    expected[rule.elements[1]].push(next);
                }
            }
        }

        prevExpectedList = this.expectedArr[idx - cur[LENGTH]] && this.expectedArr[idx - cur[LENGTH]][cur[TARGET]];

        if (prevExpectedList) {
            for (j = 0; j < prevExpectedList.length; ++j) {
                prevExpectedItem = prevExpectedList[j];
                prevRule = prevExpectedItem[RULE];
                next = mkItem(prevRule.target, prevRule, prevExpectedItem[PASSED] + 1, prevExpectedItem[LENGTH] + cur[LENGTH], [prevExpectedItem, cur]);
                if (prevExpectedItem[PASSED] + 1 === prevRule.elements.length) {
                    itemIndex = indexingItem(next);
                    if (pushed) {
                        pushed[itemIndex] = true;
                        this.priQueue.push(next);
                    }
                    expected['^'] = expected['^'] || [];
                    expected['^'].push(next);//[rule index, passed, length]
                }
                else {
                    expected[prevRule.elements[prevExpectedItem[PASSED] + 1]] = expected[prevRule.elements[prevExpectedItem[PASSED] + 1]] || [];
                    expected[prevRule.elements[prevExpectedItem[PASSED] + 1]].push(next);
                }
            }
        }
    }
};

DPParseInstance.prototype._trackBack = function () {
    var expectedAr = this.expectedArr;

    function visit(target, start, length) {
        var node = {
            type: target,
            start: start,
            end: start + length
        };
        var matchedItem = null;
        var expected = expectedAr[start + length - 1];
        if (!expected) return null;
        var itemList = expected['^'];
        if (!itemList) return null;
        var item;
        if (itemList) {
            for (var j = 0; j < itemList.length; ++j) {
                item = itemList[j];
                if (item[TARGET] === target) {
                    if (item[LENGTH] === length) {
                        matchedItem = item;
                    }
                }
            }
        }
        if (!matchedItem) {
            return null;
        }

        node.rule = matchedItem[RULE];
        var childItem = [];
        var cTrack = matchedItem[TRACK];
        var right, left;
        while (cTrack) {
            left = cTrack[0];
            right = cTrack[1];
            childItem.unshift(right);
            cTrack = left && left[TRACK];
        }

        var ac = childItem.reduce(function (ac, item) {
            if (typeof item[TRACK][1].content === "string") {
                ac.child.push(item[TRACK][1]);
                ac.start += 1;
            }
            else {
                ac.child.push(visit(item[TARGET], ac.start, item[LENGTH]));
                ac.start += item[LENGTH];
            }
            return ac;
        }, { start: start, child: [] });
        node.children = ac.child;
        node.end = ac.start;
        return node;
    }

    this.parsedNode = visit(this.target, 0, this.expectedArr.length);
};

DPParseInstance.prototype._findError = function () {
    function cmp(a, b) {
        return b.i - a.i;
    }

    var queue = new Heap(cmp);
    var doneArr = Array(this.expectedArr.length).fill(null).map(function () {
        return {}
    });
    this.expectedArr.forEach(function (ex, i) {
        for (var k in ex) {
            ex[k].forEach(function (it) {
                var target = it[TARGET];
                var done = doneArr[i - it[LENGTH] + 1];
                done[target] = done[target] || [];
                done[target].push(it);
            })
        }
    });

    var d = {};
    queue.push({
        t: this.target,
        i: 0
    });
    d[this.target + '/' + 0] = true;
    var cr, next;
    var nextIdent;
    var item;
    var hasNewExpected;
    while (queue.size() > 0) {
        cr = queue.pop();
        if (cr.i >= doneArr.length) {
            if (!this.error || this.error.tokenIdx < cr.i || this.error.type !== "expected") {
                this.error = {
                    tokenIdx: cr.i,
                    type: 'expected',
                    expectedToken: []
                }
            }
            if (cr.t[0] === '_' || cr.t[0] === '.') {
                this.error.expectedToken.push(cr.t);
            }

            continue;
        }
        hasNewExpected = false;

        if (doneArr[cr.i][cr.t]) {
            doneArr[cr.i][cr.t].forEach(function (item) {
                if (item[PASSED] < item[RULE].elements.length) {
                    next = {
                        i: cr.i + item[LENGTH],
                        t: item[RULE].elements[item[PASSED]]
                    };
                    nextIdent = next.t + '/' + next.i;
                    hasNewExpected = true;
                    if (!d[nextIdent]) {
                        d[nextIdent] = true;
                        queue.push(next);
                    }
                }
            });
        }

        this.rules.forEach(function (rule) {
            if (rule.target === cr.t) {
                next = {
                    i: cr.i,
                    t: rule.elements[0]
                };
                nextIdent = next.t + '/' + next.i;
                if (!d[nextIdent]) {
                    d[nextIdent] = true;
                    queue.push(next);
                }
            }
        });

        if (!hasNewExpected) {
            if (!this.error || this.error.tokenIdx < cr.i) {
                this.error = {
                    tokenIdx: cr.i,
                    type: 'unexpected'
                }
            }
        }
    }

    if (this.error.type === 'expected') {
        this.error.message = 'Expected: ' + this.error.expectedToken.map(function (t) {
            if (t[0] === '.') return t.substring(1);
            if (t[0] === '_') return JSON.stringify(t.substring(1));
        }).join(', ');
    }
    else if (this.error.type === 'unexpected') {
        this.error.message = 'Unexpected token ' + this.tokens[this.error.tokenIdx].content;
    }
};

DPParseInstance.prototype._calcAST = function () {
    this.ast = this.parsedNode.rule.toAST(this.parsedNode);
};

export function parsedNodeToAST(parsedNode) {
    return parsedNode.rule.toAST(parsedNode)
}

export default DPParseInstance;
