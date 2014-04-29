provecss [![Build Status](https://travis-ci.org/mozilla-b2g/gaia.svg)](https://travis-ci.org/gasolin/provecss) [![Dependency Status](https://david-dm.org/gasolin/provecss.svg)](https://david-dm.org/gasolin/provecss) [![Code Climate](https://codeclimate.com/github/gasolin/provecss.png)](https://codeclimate.com/github/gasolin/provecss)
=======

Write future-proved CSS from now.

`provecss` let us able to use [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import), [variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), [media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries) in mobile-first webapp development without worring the performance. `provecss` could preprocess the origin css file and generate backward compatible css styles.

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

imprt.css
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


Media Query Merging
----------------------

TBD

Input:


Output:


Usage (in node)
=================

```js
var provecss = require('provecss');
var fs = require('fs');

// read file
var input = path.resolve(__dirname, 'input.css');
var output = provecss(input);
```

To inline @import files, you could pass `path` option and `provecss` will search and inline import files in `path`'s directory:

```
provecss(input,{path:"test/features/imprt.css"});
```

Options:

* browsers: Pass [autoprefixer](https://github.com/ai/autoprefixer) options. pass `ff28` will generate firefox only prefixes. `provecss` won't generate prefixes by default.
* path: File path that contain @import.
* base: Normally provecss will parsed the same directory as in file path. you could explicitly pass a `path` option for will-be-import styles.

Usage (in command line)
==========================

TBD

Credit
========
`provecss` is based on [rework](https://github.com/reworkcss/rework).
Forked from [myth](https://github.com/segmentio/myth) to fit our needs.
