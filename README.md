# object-mapper
Tool for map and transforming data in an declarative way.

# API
```js
var themap = {
        "value1": "value1",
        "value2": "value2",
        "sumOfValue":function(value,sourceobject){
            return {value:sourceobject.value1 + sourceobject.value2}
        }
}
var mapper=requirer('objectmapper');
var map=mapper.create(themap);
var res=map.map({
    value1:2,
    value2:3
});
console.dir(res,true);
//Outputs
//{ value1: 2, value2: 3, sumOfValue: 5 }
//
```

## More examples

### Fixed values
```js
var themap = {
        "value1": "value1",
        "value2": "value2",
        "sumOfValue":{
                $fixed:true,
                value:"Yihaa"
        }
}
var mapper=requirer('objectmapper');
var map=mapper.create(themap);
var res=map.map({
    value1:2,
    value2:3
});
console.dir(res,true);
//Outputs
//{ value1: 2, value2: 3, sumOfValue: "Yihaa" }
//
```
### Nested values
```js
var themap = {
        "value1": "value1",
        "value2": "value2",
        //You can nest object
        "someObject":{
               val:"value1",
               someInnerObject:{
               val2:value2
               }
        },
        //Or write with . notation
        "someObject.someInnerObject.val1:"value1"
}
var mapper=requirer('objectmapper');
var map=mapper.create(themap);
var res=map.map({
    value1:2,
    value2:3
});
console.dir(res,true);
/*Outputs
{ value1: 2,
  value2: 3,
  someObject: { val: 2, someInnerObject: { val2: 3, val1: 2 } } }
*/
```

```
