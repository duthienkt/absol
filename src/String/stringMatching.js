export function wordLike(a, b) {
    var m = a.length;
    var n = b.length;

    function map(i, j) {
        return i * m + j;
    }
    var Q = [];
    for (var i = 0; i <= m; ++i)
        Q[map(i, 0)] = 0.0;
    for (var j = 0; j <= n; ++j)
        Q[map(0, j)] = 0.0;

    for (var i = 0; i < m; ++i)
        for (var j = 0; j < n; ++j)
            if (a.charAt(i) == b.charAt(j)) {
                if (Q[map(i + 1, j + 1)]) {
                    if (Q[map(i + 1, j + 1)] < Q[map(i, j)] + 1)
                        Q[map(i + 1, j + 1)] = Q[map(i, j)] + 1;

                }
                else
                    Q[map(i + 1, j + 1)] = Q[map(i, j)] + 1;
            }
            else
                Q[map(i + 1, j + 1)] = Math.max(Q[map(i + 1, j)], Q[map(i, j + 1)]);

    return Q[map(m, n)] / Math.max(m, n);
}



export function phraseMatch(a, b, matchWordPow) {
    matchWordPow = matchWordPow || 1;
    var spliter = /[\s,-\.+?\_]+/;
    var notEmp = function (e) { return e.length > 0; };
    var sq1 = a.toLowerCase().split(spliter).filter(notEmp);
    var sq2 = b.toLowerCase().split(spliter).filter(notEmp);
    var m = sq1.length;
    var n = sq2.length;

    function map(i, j) {
        return i * m + j;
    }
    var Q = [];
    for (var i = 0; i <= m; ++i)
        Q[map(i, 0)] = 0.0;
    for (var j = 0; j <= n; ++j)
        Q[map(0, j)] = 0.0;

    var e = 0.0;
    for (var i = 0; i < m; ++i)
        for (var j = 0; j < n; ++j) {
            e = Math.pow(wordLike(sq1[i], sq2[j]), matchWordPow);
            if (Q[map(i + 1, j + 1)]) {
                if (Q[map(i + 1, j + 1)] < Q[map(i, j)] + e)
                    Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;

            }
            else
                Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;
            e = Math.max(Q[map(i + 1, j)], Q[map(i, j + 1)]);
            if (e > Q[map(i + 1, j + 1)]) Q[map(i + 1, j + 1)] = e;
        }
    return Q[map(m, n)] / Math.max(Math.min(m, n), 1);
};

export function phraseLike (a, b, matchWordPow) {
    matchWordPow = matchWordPow || 1;
    var spliter = /[\s,-\.+?\_]+/;
    var notEmp = function (e) { return e.length > 0; };
    var sq1 = a.toLowerCase().split(spliter).filter(notEmp);
    var sq2 = b.toLowerCase().split(spliter).filter(notEmp);
    var m = sq1.length;
    var n = sq2.length;

    function map(i, j) {
        return i * m + j;
    }
    var Q = [];
    for (var i = 0; i <= m; ++i)
        Q[map(i, 0)] = 0.0;
    for (var j = 0; j <= n; ++j)
        Q[map(0, j)] = 0.0;

    var e = 0.0;
    for (var i = 0; i < m; ++i)
        for (var j = 0; j < n; ++j) {
            e = Math.pow(wordLike(sq1[i], sq2[j]), matchWordPow);
            if (Q[map(i + 1, j + 1)]) {
                if (Q[map(i + 1, j + 1)] < Q[map(i, j)] + e)
                    Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;

            }
            else
                Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;
            e = Math.max(Q[map(i + 1, j)], Q[map(i, j + 1)]);
            if (e > Q[map(i + 1, j + 1)]) Q[map(i + 1, j + 1)] = e;
        }
    return Q[map(m, n)] / Math.max(Math.max(m, n), 1);
}

