purecss [![Dependency Status](https://david-dm.org/gasolin/purecss.svg)](https://david-dm.org/gasolin/purecss)
=======

Write future proved CSS from now.

Usage
========

```js
var purecss = require('purecss');
var fs = require('fs');

// read file
var input = path.resolve(__dirname, 'input.css');
var output = purecss(input);
```

To inline @import files, you could pass `path` option and purecss will search and inline import files in `path`'s directory:

```
purecss(input,{path:"test/features/imprt.css"});
```

Credit
========
purecss is forked from [myth](https://github.com/segmentio/myth) to fit our needs.
