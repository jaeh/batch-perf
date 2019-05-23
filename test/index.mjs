import { is, log } from '@magic/test'

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
  [[[[() => {}]]],[[[() => {}]]],[[[() => {}]]],[[[() => {}]]],[[[() => {}]]],[[[() => {}]]],[[[() => {}]]],[[[() => {}]]]],
]

const fns = {
  batch1,
  batch2,
}

const time = arg => {
  const times = (['batch1', 'batch2']).map((fn, i) => {
    const startTime = new Date().getTime()

    for (let i = 0; i < 100000; i++) {
      fns[fn](arg)
    }

    const endTime = new Date().getTime()

    const timeTaken = endTime - startTime
    return timeTaken
  })

  const [time1, time2] = times
  console.log(`
batch1 ${log.paint('yellow', time1)}ms - batch2 ${log.paint('yellow', time2)}ms.
batch1 was ${log.paint('green', parseInt((time1 / time2) * 100))}% faster`)

  return true
}

export default {
  unit: lists.map(t => ({
    fn: batch1(t),
    expect: is.deep.equal(batch2(t)),
  })),

  perf: lists.map(t => ({ fn: time(t) })),
}