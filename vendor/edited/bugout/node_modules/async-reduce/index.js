
module.exports = reduce

function reduce(arr, initial, fn, cb) {
  var curr = initial

  function next(index) {
    var sync = true
    for (var i = index; i < arr.length; i++) {
      var done = false
      fn(curr, arr[i], function(err, val) {
        if (err) return cb(err, curr)
        done = true
        curr = val
        if (!sync) next(i + 1)
      })
      sync = done
      if (!sync) return
    }
    cb(null, curr)
  }

  next(0)
}

reduce.concurrent = function(level, unit, combine) {
  return function(arr, initial, fn, cb) {
    var results = new Array(level)
      , done = false
      , pos = 0
      , pending = level

    function _reduce(chunk, index) {
      reduce(chunk, index == 0 ? initial : unit, fn, function(err, val) {
        if (done) return
        if (err) return done = true, cb(err)
        pending--
        results[index] = val
        if (pending == 0)
          combine
            ? cb(null, results.reduce(combine))
            : cb()
      })
    }

    for (var i = 0; i < level; i++) {
      var chunk = Math.ceil((arr.length - pos) / (level - i))
      _reduce(arr.slice(pos, pos + chunk), i)
      pos += chunk
      if (done) return
    }
  }
}
