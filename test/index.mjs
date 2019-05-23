import { is } from '@magic/test'

var batch1 = function(list) {
  var out = []
  list.forEach(function(item) {
    !item || item === true
      ? out.push(false)
      : typeof item[0] === "function"
      ? out.push(item)
      : out.push(...batch1(item))
  })
  return out
}

var batch2 = function(list) {
  return list.reduce(function(out, item) {
    return out.concat(
      !item || item === true
        ? false
        : typeof item[0] === "function"
        ? [item]
        : batch2(item)
    )
  }, [])
}

const lists = [
  [[() => {}, () => {}]],
  [true],
  [false],
  [undefined],
  [null],
  [[[() => {}]]],
  [[[[() => {}]]]],
]

export default lists.map(t => ({
  fn: batch1(t),
  expect: is.deep.equal(batch2(t)),
}))