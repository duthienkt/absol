import { resolveUrl } from "./url";

export default function remoteRequireNodeAsync(filename, entry) {
    var moduleCache = {};
    var factors = {};
    var resources = {};


    function getFileName(path) {
        return path.split('/').pop();
    }

    function getExtension(fileName) {
        return fileName.split('.').slice(1).pop() || null;
    }

    function require(currentLoc, fn) {
        var fullPath = resolveUrl(currentLoc, fn);
        if (factors[fullPath + '.js']) fullPath = fullPath + '.js';
        var filename = getFileName(fullPath);//__filename
        var module = moduleCache[fullPath];
        if (!module) {
            if (factors[fullPath]) {
                module = { 'exports': {} };
                moduleCache[fullPath] = module;
                factors[fullPath](require.bind(null, fullPath), module, module.exports, resolveUrl(fullPath, '.'), filename, window)
            }
            else {
                throw new Error("Could not find module :" + fullPath);
            }
        }
        return module.exports;
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
        var ext = getExtension(getFileName(fullPath));
        resource.sync = fetch(fullPath, { cache: "no-cache" }).then(res => res.text()).then(text => {
            resource.text = text;
            switch (ext) {
                case 'js':
                    factors[fullPath] = new Function('require', 'module', 'exports', '__dir', '__filename', 'global', text)
                    break;
                case 'json':
                    factors[fullPath] = true;
                    moduleCache[fullPath] = { exports: JSON.parse(text) };
                    break;
                default:
                    factors[fullPath] = true;
                    moduleCache[fullPath] = { exports: text };
            }
            var requiredNodes;
            if (ext === 'js') {
                requiredNodes = findAllRequire(text);
                var syncs = requiredNodes.map(ident => fetchResource(resolveUrl(fullPath, ident)));
                return Promise.all(syncs);
            }
        });

        return resource.sync;
    }

    var absoluteEntry = location.href;

    function requireCode(filename, entry, fileList) {
        if (!fileList) fileList = {};
        if (!entry) entry = absoluteEntry;
        var fullPath = resolveUrl(entry, filename);
        if (fileList[fullPath] === 'pending') {
            return Promise.resolve();
        }
        else if (fileList[fullPath] !== undefined && fileList[fullPath] !== 'pending') {
            return Promise.resolve();
        }
        fileList[fullPath] = true;
        fileList[fullPath] = 'pending';
        return fetch(fullPath, { cache: "no-cache" }).then(res => res.text()).then(text => {
            fileList[fullPath] = text;
            var requirePath = findAllRequire(text);
            var waitCode = requirePath.map(function (e) {
                return requireCode(e, fullPath, fileList);
            });
            return Promise.all(waitCode).then(function () {
                return fileList;
            });
        });
    }


    if (!entry) entry = absoluteEntry;
    if (!getExtension(filename)) filename += '.js';
    var fullPath = resolveUrl(entry, filename);
    return fetchResource(fullPath).then(() => {
        return require('', fullPath);
    });
}
