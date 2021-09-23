"use strict";

var _ = require('./helper-functions');
var mapper = {};
mapper.get = function (valueobject, jsonpath) {
    var parts = jsonpath.split('.');
    var v = valueobject;
    var i = 0;
    for (i; i < parts.length - 1; i++) {
        if (v[parts[i]])
            v = v[parts[i]];
    }
    return v[parts[i]];
};
mapper.set = function (valueobject, jsonpath, value) {
    var parts = jsonpath.split('.');
    var v = valueobject;
    var i = 0;
    for (i; i < parts.length - 1; i++) {
        if (!v[parts[i]]) {
            v[parts[i]] = {};
        }
        v = v[parts[i]];
    }
    v[parts[i]] = value;
    return;
};
mapper.flatten = function (mapobject, prefix) {
    var res = {};
    if (!prefix) {
        prefix = "";
    }
    else
        prefix += "."
    var keys = _.keys(mapobject);
    for (var i = 0; i < keys.length; i++) {
        let m = mapobject[keys[i]];
        var prefixedKey = prefix + keys[i]
        if (_.isObject(m) && !_.isFunction(m)) {
            if (m.$fixed === true) {
                res[prefixedKey] =
                {
                    value: m.value,
                    $fixed: true
                }
            }
            else
                res = _.extend(res, mapper.flatten(m, prefixedKey));
        }
        if (_.isFunction(m) || !_.isObject(m)) {
            res[prefixedKey] = m;
        }
    }
    return res;
}
mapper.create = function (mapobject) {
    var themap = {};
    themap._map = mapper.flatten(mapobject);
    themap.map = function (sourceobject) {
        var result = {};
        var keys = _.keys(themap._map);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var m = themap._map[key];
            if (_.isFunction(m)) {
                var r = m(mapper.get(sourceobject, key), sourceobject);
                mapper.set(result, r.name ? r.name : key, r.value);
            }
            else if (_.isObject(m)) {
                mapper.set(result, key, m.value);
            }
            else
                mapper.set(result, key, mapper.get(sourceobject, m));
        }
        return result;
    };
    return themap;
};
module.exports = mapper;