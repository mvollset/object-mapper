"use strict";

const isObject = function (obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
const isFunction = function (obj) {
    const type = typeof obj;
    return type === 'function' 
}

const keys = function (obj) {
    if(!isObject(obj)) 
        return [];
    return Object.keys(obj);
}
const extend = function (obj) {
    const length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (let index = 1; index < length; index++) {
      let source = arguments[index],
          thekeys = keys(source),
          l = thekeys.length;
      for (let i = 0; i < l; i++) {
        let key = thekeys[i];
        if (obj[key] === undefined) 
            obj[key] = source[key];
      }
    }
    return obj;

}
module.exports  = {
    isObject:isObject,
    isFunction:isFunction,
    keys:keys,
    extend:extend
}