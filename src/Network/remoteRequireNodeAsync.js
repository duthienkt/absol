export default function remoteRequireNodeAsync(filename, entry) {
    var moduleCache = {};
    var factors = {};
    var resources = {};


    function getFileName(path) {
        return path.split('/').pop();
    }

    function getExtension(fileName) {
        return fileName.split('.')[1] || null;
    }

    function require(currentLoc, fn) {
        var dir = concatUrl(currentLoc, '..');
        var fullPath = concatUrl(dir, fn);
        if (factors[fullPath + '.js']) fullPath = fullPath + '.js';
        var filename = getFileName(fullPath);//__filename
        var module = moduleCache[fullPath];
        if (!module) {
            if (factors[fullPath]) {
                module = { 'exports': {} };
                moduleCache[fullPath] = module;
                factors[fullPath](require.bind(null, fullPath), module, module.exports, dir, filename, window)
            }
            else {
                throw new Error("Could not find module :" + fullPath);
            }
        }
        return module.exports;
    }


    function concatUrl(url, concat) {
        if (concat.startsWith('https:') || concat.startsWith('http:')) return concat;
        var url1 = url.split('/');
        var url2 = concat.split('/');
        var url3 = [];
        var i, l;
        for (i = 0, l = url1.length; i < l; i++) {
            if (url1[i] === '..') {
                url3.pop();
            }
            else if (url1[i] !== '.') {
                url3.push(url1[i]);
            }
        }
        for (i = 0, l = url2.length; i < l; i++) {
            if (url2[i] === '..') {
                url3.pop();
            }
            else if (url2[i] !== '.'){
                url3.push(url2[i]);
            }
        }
        return url3.join('/');
    }

    function findAllRequire(s) {
        var regex0 = /[^a-zA-Z_.0-9]require\s*\([^\)]+\)/gm;
        var regex1 = /require\s*\([^)]+\)/gm;
        var regex2 = /\([^)]+\)/gm;
        var es = s.match(regex0);

        if (!es) return [];
        return es.map(function (s) {
            s = s.match(regex1)[0];
            s = s.match(regex2)[0];
            s = s.replace(/['"()]/gm, '');
            if (!getExtension(getFileName(s))) s += '.js';
            return s;
        });
    }

    function fetchResource(fullPath) {
        if (resources[fullPath]) return Promise.resolve();
        var resource = {};
        resources[fullPath] = resource;
        var dir = concatUrl(fullPath, '..');
        var ext = getExtension(getFileName(fullPath));
        resource.sync = fetch(fullPath, { cache: "no-cache" }).then(res => res.text()).then(text => {
            resource.text = text;
            switch (ext) {
                case 'js':
                    factors[fullPath] = new Function('require', 'module', 'exports', '__dir', '__filename', 'global', text)
                    break;
                case 'html':
                case 'tpl':
                case 'svg':
                    factors[fullPath] = true;
                    moduleCache = { exports: text };
                    break;
                case 'json':
                    factors[fullPath] = true;
                    moduleCache = { exports: JSON.parse(text) };
                    break;
            }
            var requiredNodes;
            if (ext === 'js') {
                requiredNodes = findAllRequire(text);
                var syncs = requiredNodes.map(ident => fetchResource(concatUrl(dir, ident)));
                return Promise.all(syncs);
            }
        });

        return resource.sync;
    }

    var absoluteEntry = location.href[location.href.length - 1] === '/' ? location.href : concatUrl(location.href, "..");

    function requireCode(filename, entry, fileList) {
        if (!fileList) fileList = {};
        if (!entry) entry = absoluteEntry;
        var fullPath = concatUrl(entry, filename);
        if (fileList[fullPath] === 'pending') {
            return Promise.resolve();
        }
        else if (fileList[fullPath] !== undefined && fileList[fullPath] !== 'pending') {
            return Promise.resolve();
        }
        fileList[fullPath] = true;
        var dir = concatUrl(fullPath, '..');
        fileList[fullPath] = 'pending';
        return fetch(fullPath, { cache: "no-cache" }).then(res => res.text()).then(text => {
            fileList[fullPath] = text;
            var requirePath = findAllRequire(text);
            var waitCode = requirePath.map(function (e) {
                return requireCode(e, dir, fileList);
            });
            return Promise.all(waitCode).then(function () {
                return fileList;
            });
        });
    }



    if (!entry) entry = absoluteEntry;
    if (!getExtension(filename)) filename += '.js';
    var fullPath = concatUrl(entry, filename);
    return fetchResource(fullPath).then(() => {
        return require('', fullPath);
    });
}
