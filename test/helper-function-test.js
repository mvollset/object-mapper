const assert = require('chai').assert;
const helpers = require('../module/helper-functions');
describe('utility functions', function () {
    describe('isObject function', function () {
        it('Should be an object', function () {
            const isObject = helpers.isObject({
                a: 2,
                b: 1,
                c: 1
            });
            assert(isObject, "Should be an true");

        });
        it('Numbers should not be an object', function () {
            const isObject = helpers.isObject(1);
            assert.isFalse(isObject, "Should be false");

        })
        it('Functions should be an object', function () {
            const isObject = helpers.isObject(() => {
                return 1;
            });
            assert(isObject, "Should be an true");

        })
        it('Is arrays an object', function () {
            const isObject = helpers.isObject([1, 3, 5]);
            assert(isObject, "Should be an true");

        })
        it('Date should be an object', function () {
            const isObject = helpers.isObject(new Date());
            assert(isObject, "Should be false");

        })
        it('String should not be an object', function () {
            const isObject = helpers.isObject('jalla');
            assert.isFalse(isObject, "Should be false");

        })
    });
    describe('isFunction function', function () {
        //So meta.........
        it('I am a function', function () {
            let isFunction = helpers.isFunction(helpers.isFunction);
            assert(isFunction, "Should be function")

        });
        it('Lambda is a function', function () {
            let isFunction = helpers.isFunction(() => {
                return true;
            });
            assert(isFunction, "Should be function")

        });
        it('I am a function', function () {
            let p = function () {
                return 12;
            }
            let isFunction = helpers.isFunction(p);
            assert(isFunction, "Should be function")

        });
        it('I am not a function', function () {
            let isFunction = helpers.isFunction(1);
            assert.isFalse(isFunction, "Should be function")

        });
    });
    describe('keys', function () {
        it('Should return all keys of an object', function () {
            let newObj = helpers.extend({
                a: 2
            });
            let keys = helpers.keys(newObj)
            assert.strictEqual(keys.length, 1, "Should be 1 ");
        });
        it('Should return empty array if not object', function () {
            let keys = helpers.keys(1)
            assert.isArray(keys, "Should be an array");
            assert.strictEqual(keys.length, 0, "Should be 1 ");
        });
    });
    describe('Extend', function () {
        it('Should return all keys of an object', function () {
            let newObj = helpers.extend({
                a: 2
            });
            let keys = helpers.keys(newObj)
            assert.isArray(keys, "Should be an array");
            assert.strictEqual(keys.length, 1, "Should be 1 ");
        });
        it('Do not overwrite existing', function () {
            let newObj = helpers.extend({
                a: 2
            }, {
                a: 3
            }
            );
            let keys = helpers.keys(newObj)
            assert.isArray(keys, "Should be an array");
            assert.deepEqual(newObj,{
                a: 2
            } , "Should be 1 ");
        });
        it('Should return empty array if not object', function () {
            let newObj = helpers.extend({
                a: 2
            }, {
                b: 3
            },
                {
                    c: 4,
                    d: {
                        e: 34,
                        f: true
                    }
                });
            let keys = helpers.keys(newObj)
            assert.isArray(keys, "Should be an array");
            assert.strictEqual(keys.length, 4, "Should be 1 ");
            assert.containsAllKeys(newObj, ["a", "b"])
        });
    });


});