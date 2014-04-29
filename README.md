purecss [![Build Status](https://travis-ci.org/mozilla-b2g/gaia.svg)](https://travis-ci.org/gasolin/purecss) [![Dependency Status](https://david-dm.org/gasolin/purecss.svg)](https://david-dm.org/gasolin/purecss) [![Code Climate](https://codeclimate.com/github/gasolin/purecss.png)](https://codeclimate.com/github/gasolin/purecss)
=======

Write future-proved CSS from now.

`purecss` let us able to use [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import), [variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), [media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries) in mobile-first webapp development without worring the performance. `purecss` could preprocess the origin css file and generate backward compatible css styles.

Features
========

Import inlining
-----------------

Thanks to [rework-importer](https://github.com/simme/rework-importer)

Input:

imprt.css
```css
@import url("imprt_core.css");
@import url("imprt_large.css");
```

imprt_core.css
```css
headers {
  background-color: orange;
}
```

imprt_large.css
```css
@media (min-width: 768px) {
  headers {
    background-color: black;
  }
}
```

Output:
```css
headers {
  background-color: orange;
}

@media (min-width: 768px) {
  headers {
    background-color: black;
  }
}
```

CSS Variables replacing
--------------------------

Thanks to [rework-vars](https://github.com/visionmedia/rework-vars)

Input:

```css
:root {
  --red: #F00;
}

body {
  color: var(--red);
}
```

Output:

```css
body {
  color: #0F0;
}
```


Media Query
---------------

TBD

Input:


Output:


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
`purecss` is based on [rework](https://github.com/reworkcss/rework).
Forked from [myth](https://github.com/segmentio/myth) to fit our needs.
