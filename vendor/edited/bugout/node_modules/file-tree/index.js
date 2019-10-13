var commondir =  require('commondir')
var reduce = require('async-reduce')
var path = require('path')
var flat = require('flat')

module.exports = tree

function tree(filenames, mapper, callback) {
  filenames = filenames.map(resolve)

  var top = commondir(filenames)

  reduce(filenames, {}, function(memo, name, next) {
    var key = path.relative(top, name)
    mapper(name, function(err, result) {
      if (err) return next(err)
      result.__deepest_node__ = true
      memo[key] = result
      return next(null, memo)
    })
  }, function(err, object) {
    if (err) return callback(err)

    object = flat.unflatten(object, { delimiter: path.sep })

    callback(null, clean(reformat(object, 'name')))
  })
}

function reformat(object, namekey) {
  if (typeof object !== 'object') return object
  if (object.__deepest_node__) return object

  var entries = []
  var result
  var entry

  for (var key in object) {
    var entry = reformat(object[key], namekey)
    if (entry.__deepest_node__) {
      entry[namekey] = key
      entries.push(entry)
    } else {
      entry = { children: entry }
      entry[namekey] = key
      entries.push(entry)
    }
  }

  return entries
}

function clean(object) {
  if (typeof object !== 'object') return object
  delete object.__deepest_node__
  for (var key in object) {
    clean(object[key])
  }
  return object
}

function resolve(file) {
  return path.resolve(file)
}
