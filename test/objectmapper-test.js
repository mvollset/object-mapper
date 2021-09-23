'use strict';
const assert = require('chai').assert;
const mapper = require('../module/objectmapper');
describe('Objectmapper functions', function () {
    it('Should work with flat objects', function () {
        let map = mapper.create({
            a: 'b',
            c: 'd'
        });
        let result = map.map({
            b: 'b',
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: 'b',
                c: 'd'
            }, "Flat object testing"
        )
    });
    it('Should work with fixed objects', function () {
        let map = mapper.create({
            a: 'b',
            c: 'd',
            e: {
                value: '123',
                $fixed: true
            }
        });
        let result = map.map({
            b: 'b',
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: 'b',
                c: 'd',
                e: '123'
            }, "Flat object testing"
        )
    });
    it('Should work with functions', function () {
        let map = mapper.create({
            a: 'b',
            c: 'd',
            e: function (v, obj) {
                return {
                    value: obj.b + obj.d
                }
            }
        });
        let result = map.map({
            b: 'b',
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: 'b',
                c: 'd',
                e: 'bd'
            }, "Flat object testing"
        )
    });
    it('Should work with deep nesting', function () {
        let map = mapper.create({
            a: 'b.v.a',
            c: 'd'
        });
        let result = map.map({
            b: {
                v: {
                    a: 123
                }
            },
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: 123,
                c: 'd',
            }, "Flat object testing"
        )
    });
    it('Should work with deep map nesting', function () {
        let map = mapper.create({
            "a.b": 'b.v.a',
            c: 'd',
            "a.f": 'd'
        });
        let result = map.map({
            b: {
                v: {
                    a: 123
                }
            },
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: {
                    b: 123,
                    f: 'd'
                },
                c: 'd',
            }, "Flat object testing"
        )
    });
    it('Fixed values can be objects', function () {
        let map = mapper.create({
            "a.b": 'b.v.a',
            c: 'd',
            "a.f": 'd',
            d: {
                value: {
                    value: 1,
                    name: 'en'
                },
                $fixed: true

            }
        });
        let result = map.map({
            b: {
                v: {
                    a: 123
                }
            },
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: {
                    b: 123,
                    f: 'd'
                },
                c: 'd',
                d: {
                    value: 1,
                    name: 'en'
                }
            }, "Flat object testing"
        )
    });
    it('Fixed values can be objects', function () {
        let map = mapper.create({
            a: {
                b: 'b.v.a',
                f: 'd'
            },
            c: 'd',
            d: {
                value: {
                    value: 1,
                    name: 'en'
                },
                $fixed: true

            }
        });
        let result = map.map({
            b: {
                v: {
                    a: 123
                }
            },
            d: 'd'
        });
        assert.deepEqual(result,
            {
                a: {
                    b: 123,
                    f: 'd'
                },
                c: 'd',
                d: {
                    value: 1,
                    name: 'en'
                }
            }, "Flat object testing"
        )
    });
    it('You can rename fieldnames....', function () {
        let map = mapper.create({
            a: function(v,obj){
                return {
                    value:'b',
                    name:'b'
                }
            }
        });
        let result = map.map({
           a:2
        });
        assert.deepEqual(result,
            {
               b:'b'
            }, "Flat object testing"
        )
    });
});