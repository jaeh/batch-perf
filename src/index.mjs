var EMPTY_ARR = []

export var batch1 = function(list) {
  var out = []
  list.forEach(function(item) {
    !item || item === true
      ? out.push(false)
      : typeof item[0] === "function"
      ? out.push(item)
      : Array.prototype.push.apply(out, batch1(item))
  })
  return out
}

export var batch2 = function(list) {
  return list.reduce(function(out, item) {
    return out.concat(
      !item || item === true
        ? false
        : typeof item[0] === "function"
        ? [item]
        : batch2(item)
    )
  }, EMPTY_ARR)
}
