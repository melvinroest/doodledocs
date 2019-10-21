# file-tree #

A more flexible, asynchronous version of
[file-size-tree](http://github.com/hughsk/file-size-tree).

## Installation ##

``` bash
npm install file-tree
```

## Usage ##

### `require('file-tree')(files, mapper, callback)` ###

Takes an array of `files`.

`mapper(filename, next)` should pass an object to the the callback
with the metadata you want to associate with the file.

`callback(err, tree)` is called when everything's done.

``` javascript
var tree = require('file-tree')
var fs = require('fs')

tree([
    __dirname + '/project/src/index.js'
  , __dirname + '/project/src/README.md'
  , __dirname + '/project/src/package.json'
  , __dirname + '/LICENSE'
], function(filename, next) {
  fs.stat(filename, function(err, stats) {
    if (err) return next(err)
    next(null, {
      size: stats.size
    })
  })
}, function(err, fileTree) {
  console.log(fileTree) // done!
})
```
