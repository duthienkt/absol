import { randomInt } from "../Math/random";

export var identCharacters = function () {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    chars = chars + chars.toUpperCase();
    var num = '0123456789';
    var spect = '_';
    return (chars + spect + num).split('');

}();


export function randomIdent(length) {
    if (!(length > 0)) length = 4;
    var factor = identCharacters;
    return [factor[(Math.random() * (factor.length - 10)) >> 0]].concat(Array(length - 1).fill('').map(function () {
        return factor[(Math.random() * factor.length) >> 0];
    })).join('');
}

export function parallelMatch(a, b) {
    var l = Math.min(a.length, b.length);
    var res = 0;
    for (var i = 0; i < l; ++i) {
        if (a[i] == b[i]) ++res;
    }
    return res;
}

export var ipsumLoremWord = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim',
    'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum',
    'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis',
    'unde', 'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque', 'laudantium',
    'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis', 'quasi', 'architecto',
    'beatae', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
    'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt', 'neque', 'porro',
    'quisquam', 'dolorem', 'adipisci', 'numquam', 'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'aliquam',
    'quaerat', 'minima', 'nostrum', 'exercitationem', 'ullam', 'corporis', 'suscipit', 'laboriosam', 'aliquid',
    'commodi', 'consequatur', 'autem', 'vel', 'eum', 'iure', 'quam', 'nihil', 'molestiae', 'illum', 'quo',
    'at', 'vero', 'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis', 'praesentium', 'voluptatum',
    'deleniti', 'atque', 'corrupti', 'quos', 'quas', 'molestias', 'excepturi', 'occaecati', 'cupiditate',
    'provident', 'similique', 'mollitia', 'animi', 'dolorum', 'fuga', 'harum', 'quidem', 'rerum', 'facilis',
    'expedita', 'distinctio', 'nam', 'libero', 'tempore', 'sum', 'soluta', 'nobis', 'eligendi', 'optio',
    'cumque', 'impedit', 'minus', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'assumenda', 'repellendus',
    'temporibus', 'quibusdam', 'officiis', 'debitis', 'necessitatibus', 'saepe', 'eveniet', 'voluptates',
    'repudiandae', 'recusandae', 'itaque', 'earum', 'hic', 'tenetur', 'a', 'sapiente', 'delectus', 'reiciendis',
    'voluptatibus', 'maiores', 'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat', 'integer',
    'nec', 'praesent', 'cursus', 'ante', 'dapibus', 'diam', 'sem', 'nibh', 'elementum', 'imperdiet', 'sagittis',
    'mauris', 'fusce', 'tellus', 'augue', 'semper', 'porta', 'massa', 'vestibulum', 'lacinia', 'arcu', 'eget',
    'class', 'aptent', 'taciti', 'sociosqu', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos',
    'himenaeos', 'curabitur', 'sodales', 'ligula', 'dignissim', 'nunc', 'tortor', 'pellentesque', 'aenean',
    'scelerisque', 'maecenas', 'mattis', 'convallis', 'tristique', 'proin', 'egestas', 'porttitor', 'morbi',
    'lectus', 'risus', 'iaculis', 'luctus', 'ac', 'turpis', 'aliquet', 'metus', 'ullamcorper', 'tincidunt',
    'euismod', 'quisque', 'volutpat', 'condimentum', 'urna', 'facilisi', 'fringilla', 'suspendisse', 'potenti',
    'feugiat', 'mi', 'sapien', 'etiam', 'ultrices', 'justo', 'lacus', 'pharetra', 'auctor', 'interdum', 'primis',
    'faucibus', 'orci', 'posuere', 'cubilia', 'curae', 'molestie', 'dui', 'blandit', 'congue', 'pede', 'facilisis',
    'laoreet', 'donec', 'viverra', 'malesuada', 'pulvinar', 'sollicitudin', 'cras', 'nisl', 'felis', 'venenatis',
    'ultricies', 'accumsan', 'pretium', 'fermentum', 'nullam', 'purus', 'mollis', 'vivamus', 'consectetuer'
];


export function randomWord() {
    var arr = ipsumLoremWord;
    var idx = randomInt(0, arr.length - 1);
    return arr[idx];
}

/**
 * @param {number}arg1
 * @param {number=}arg2
 * @also
 * @param {number} arg1
 * @returns {string}
 */
export function randomPhrase(arg1, arg2) {
    var limitLength = arguments[arguments.length - 1];
    var minLength = 1;
    if (arguments.length > 1) minLength = arguments[0];

    if (!limitLength) limitLength = 50;
    var length = Math.ceil((Math.random() * (limitLength - minLength) + minLength) / 7);
    return new Array(length)
        .fill(null)
        .map(randomWord)
        .reduce(function (ac, cr) {
            if (ac.length + cr.length < limitLength || ac.length < minLength) {
                ac.parts.push(cr);
            }
            return ac;
        }, { parts: [], length: 0 }).parts
        .join(' ');
}

export function randomSentence(limitLenght) {
    if (!limitLenght) limitLenght = 300;
    var length = Math.ceil(Math.random() * limitLenght / 70);
    var res = new Array(length)
        .fill(null)
        .map(randomPhrase)
        .reduce(function (ac, cr) {
            if (ac.length + cr.length < limitLenght) {
                ac.parts.push(cr);
            }
            return ac;
        }, { parts: [], length: 0 }).parts
        .join(', ');
    if (Math.random() < 0.03) {
        res = res.replace(/\,/i, ':');
    }
    res = res.replace(/^./, function (x) {
        return x.toUpperCase();
    });
    res += '.';
    return res;
}

export function randomParagraph(limitLength) {
    if (!limitLength) limitLength = 1000;
    var length = Math.ceil(Math.random() * limitLength / 200);
    return new Array(length).fill(null)
        .map(randomSentence)
        .reduce(function (ac, cr) {
            if (ac.length + cr.length < limitLength) {
                ac.parts.push(cr);
            }
            return ac;
        }, { parts: [], length: 0 }).parts
        .join(' ');
}