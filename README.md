# resolve-object-path
[MIT License](http://img.shields.io/badge/license-MIT-blue.svg)
[NPM](https://img.shields.io/npm/v/resolve-object-path.svg)

A simple TypeScript utility function for getting a value from an object by following a path.

## Highlights
* Supports TypeScript!
* Full JSDoc documentation
* Very lightweight (~1.6kB of actual code!)

## Installation
### Node
```
npm install resolve-object-path --save
```
### Browser
```html
<script src="https://joker876.github.io/resolve-object-path/dist/index.min.js"></script>
```

## Importing
### Node
```typescript
const resolvePath = require('resolve-object-path');
// or
import resolvePath from 'resolve-object-path';
```

### Browser
All declarations are automatically available in all other files.

## Documentation
This package exports only one function, as the default export.

```typescript
resolvePath(object: object, path: string);
```
Where:
* `object` is the object to get the value from
* `path` is the path to the value

It returns the value the path was pointing to, or `undefined` if the object does not contain that path.

### Exceptions
* Throws if type of the argument `object` is not `"object"`.
* Throws if type of the argument `path` is not `"string"`.
* Throws if the path is invalid, such as `"."` or `"v|as.t"`.

### Examples
```typescript
import resolvePath from 'reolve-object-path';

const testObj = {
    foo: 'abc',
    'tes"t': 'pizza',
    'bra[ck"][et': 'cheese',
    bar: {
        baz: -5,
        'str-ing': { prop: 86 },
        'qux': [{}, { def: 'ghi' }],
        'fred': [1, 3, 5],
    }
};

resolvePath(testObj, ''); // returns the whole object
resolvePath(testObj, 'foo'); // -> "abc"
resolvePath(testObj, 'bar.baz'); // -> -5
resolvePath(testObj, 'bar.fred[2]'); // -> 5
resolvePath(testObj, '["foo"]'); // -> "abc"
resolvePath(testObj, '["foo"].bar'); // -> -5
resolvePath(testObj, 'bar["str-ing"]'); // -> { prop: 86 }
resolvePath(testObj, 'bar.qux[1].def'); // -> "ghi"
// even works in edge cases such as
resolvePath(testObj, '["tes"t"]'); // -> "pizza"
resolvePath(testObj, '["bra[ck"][et"]'); // -> "cheese"
```