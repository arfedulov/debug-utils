# debug-utils

## loggingProxy

Create a proxy object which produce logs on objbect's properties access,
writing and deleting.

```js
const myObject = {
    a: 'hello',
    b: 123
};

const proxy = loggingProxy(myObject, ['get', 'set', 'deleteProperty']);

const b = proxy.a; // accessing property a
proxy.f = 444; //  writing property f = 444
delete proxy.b; // deleting property b
```
