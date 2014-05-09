provecss
=========
[![Build Status](https://travis-ci.org/mozilla-b2g/gaia.svg)](https://travis-ci.org/gasolin/provecss) [![Dependency Status](https://david-dm.org/gasolin/provecss.svg)](https://david-dm.org/gasolin/provecss) [![Code Climate](https://codeclimate.com/github/gasolin/provecss.png)](https://codeclimate.com/github/gasolin/provecss)

> Write future-proved CSS from now.

`provecss` let us able to use [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import), [@media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), [variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) in mobile-first webapp development without worring the performance. `provecss` could preprocess the origin css file and generate backward compatible css styles.

Features
========

[Support test cases](https://github.com/gasolin/provecss/tree/master/test/features) demostrate the input and output result of `provecss`.

Import inlining
-----------------

Thanks to [rework-importer](https://github.com/simme/rework-importer)

Input files:

imprt.css
```css
@import url("imprt_core.css");
@import url("imprt_large.css");
@import url("imprt_xlarge.css");
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

imprt_xlarge.css
```css
@media (min-width: 1024px) {
  headers {
    background-color: red;
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

@media (min-width: 1024px) {
  headers {
    background-color: red;
  }
}
```

Import filtering
----------------------

Pass `import_filter` option as ['core', 'large'] to filter out other styles.

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

Media Query matching
----------------------

An alternative way is to pass `media_match` option as filter creteria.

Input with `{ width: '1024px', height: '768px' }` to match proper size of @media.

Output:
```css
headers {
  background-color: orange;
}

@media (min-width: 1024px) {
  headers {
    background-color: red;
  }
}
```


Media Query extracting
----------------------

Pass extra `media_extract` option as `true`

Output:
```css
headers {
  background-color: orange;
}

headers {
  background-color: red;
}
```

In result, the was-@media section just overwrited the origin style.


CSS Variables replacing
--------------------------

Thanks to [rework-vars](https://github.com/visionmedia/rework-vars)

Pass `vars` option as `true` to opt-in variabls replacing.

Input:

```css
:root {
  --main-color: orange;
}

body {
  color: var(--main-color);
}
```

Output:

```css
body {
  color: orange;
}
```


Usage (in node)
=================

You can install `provecss` via npm.

```
npm install provecss --save-dev
```

`provecss` input/output are strings. So you could chain it in any preprocessing position.

```js
var provecss = require('provecss');
var fs = require('fs');

// read file
var input = fs.readFileSync('imprt.css', 'utf8');
var output = provecss(input);

// write file
fs.writeFileSync('imprt.out.css', output);
```

To inline @import files, you could pass `path` option and `provecss` will search and inline import files in `path`'s directory:

```
provecss(input, {path: 'test/features/imprt.css'});
```

**Options**

* `browsers`: Pass [autoprefixer options](https://github.com/ai/autoprefixer#browsers) here. pass `firefox 24` or `chrome 10` will generate browser only prefixes. `provecss` won't generate prefixes by default.
* `path`: File path that contain @import.
* `base`: Normally provecss will parsed the same directory as in file path. you could explicitly pass a `path` option for will-be-import styles.
* `media_filter`: While precoess @import, The postfix `_<target>` will be filtered.
* `media_match`: specify the match creteria to filter out @media conditions.
* `media_extract`: set to `true` to remove @media statement.
* `vars`: replace css variable while `true`. `provecss` won't do variable replacing by default.

Usage (with grunt)
======================

Grunt plugin is available in https://www.npmjs.org/package/grunt-provecss
Pass same options as use in node.

Usage (in command line)
==========================

You can Run command in console

```
provecss source target [options]
```

For example

```
provecss color.css color.out.css [options]
```

**Options**
* `--vars`: enable css variable replacing
* `--import`: enable import inlining
* `--filter [targets]`: enable import filtering
* `--match [width]x[height]`: enable media matching
* `--extract`: enable media extracting
* `--browsers <browsers>`, 'enable auto-prefixing, pass [autoprefixer options](https://github.com/ai/autoprefixer#browsers) here. `all` option is the short cut to fit all major browsers.


Credit
========
`provecss` is based on [rework](https://github.com/reworkcss/rework).
Forked from [myth](https://github.com/segmentio/myth) and [rework-importer](https://github.com/simme/rework-importer) to fit our needs.

License
========

MIT
