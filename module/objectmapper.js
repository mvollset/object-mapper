"use strict";

const _ = require('./helper-functions');
let mapper = {};
mapper.get = function (valueobject, jsonpath) {
    const parts = jsonpath.split('.');
    let v = valueobject;
    let i = 0;
    for (i; i < parts.length - 1; i++) {
        if (v[parts[i]])
            v = v[parts[i]];
    }
    return v[parts[i]];
};
mapper.set = function (valueobject, jsonpath, value) {
    const parts = jsonpath.split('.');
    let v = valueobject;
    let i = 0;
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
    let res = {};
    if (!prefix) {
        prefix = "";
    }
    else
        prefix += "."
    const keys = _.keys(mapobject);
    for (let i = 0; i < keys.length; i++) {
        const m = mapobject[keys[i]];
        const prefixedKey = prefix + keys[i]
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
    let themap = {};
    themap._map = mapper.flatten(mapobject);
    themap.map = function (sourceobject) {
        let result = {};
        const keys = _.keys(themap._map);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let m = themap._map[key];
            if (_.isFunction(m)) {
                let r = m(mapper.get(sourceobject, key), sourceobject);
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