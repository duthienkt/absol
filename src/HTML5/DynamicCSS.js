function DynamicCSS() {
    this.elt = document.createElement('style');
    this.data = {};
    this.state = 'STANDBY';
    this.start();
}

/**
 *
 * @returns {this}
 */
DynamicCSS.prototype.commit = function () {
    this.elt.innerHTML = Object.keys(this.data).map(ruleQuery => {
            var rule = this.data[ruleQuery];
            return [
                ruleQuery + ' {',
                '    ' + Object.keys(rule).map(name => name + ': ' + rule[name] + ';').join('\n'),
                '}'
            ].join('\n');
        }
    ).join('\n\n');
    return this;
};

DynamicCSS.prototype.start = function () {
    if (this.state !== 'STANDBY' && this.state !== 'STOP') return;
    this.state = 'RUNNING';
    document.head.appendChild(this.elt);
    return this;
};

DynamicCSS.prototype.stop = function () {
    if (this.state !== 'RUNNING') return;
    this.elt.remove();
    return this;
};


DynamicCSS.prototype.destroy = function () {
    this.stop();
    if (this.state !== 'STOP') return;
    this.elt = null;
    return this;
};

/***
 *
 * @param {string} ruleQuery
 * @param {string} name
 * @param {string} value
 * @returns {this}
 */
DynamicCSS.prototype.setProperty = function (ruleQuery, name, value) {
    this.data[ruleQuery] = this.data[ruleQuery] || {};
    this.data[ruleQuery][name] = value;
    return this;
};

/**
 *
 * @param ruleQuery
 * @param name
 * @returns {*|undefined}
 */
DynamicCSS.prototype.getProperty = function (ruleQuery, name) {
    var rule = this.data[ruleQuery];
    return rule ? rule[name] : undefined;
};

/***
 *
 * @param ruleQuery
 * @param property
 * @returns {DynamicCSS}
 */
DynamicCSS.prototype.removeProperty = function (ruleQuery, property) {
    var rule = this.data[ruleQuery];
    if (rule) delete rule[property];
    return this;
};

/***
 *
 * @param ruleQuery
 * @param {object} properties
 * @returns {this}
 */
DynamicCSS.prototype.setRule = function (ruleQuery, properties) {
    this.data[ruleQuery] = Object.assign({}, properties);
    return this;
};

/***
 *
 * @param ruleQuery
 * @param {object} properties
 * @returns {this}
 */
DynamicCSS.prototype.modifyRule = function (ruleQuery, properties) {
    this.data[ruleQuery] = Object.assign(this.data[ruleQuery] || {}, properties);
    return this;
};

/***
 *
 * @param {string} ruleQuery
 * @returns {object}
 */
DynamicCSS.prototype.getRule = function (ruleQuery) {
    return this.data[ruleQuery];
};

/**
 *
 * @param {string} ruleQuery
 * @returns {this}
 */
DynamicCSS.prototype.removeRule = function (ruleQuery) {
    delete this.data[ruleQuery];
    return this;
};

/***
 *
 * @param {object} rules
 * @returns {this}
 */
DynamicCSS.prototype.setRules = function (rules) {
    Object.keys(rules).forEach(key => this.setRule(key, rules[key]));
    return this;
};


DynamicCSS.prototype.getRules = function () {
    return this.data;
};

DynamicCSS.prototype.modifyRules = function (rules) {
    Object.keys(rules).forEach(key => this.modifyRule(key, rules[key]));
    return this;
};

export default DynamicCSS;
