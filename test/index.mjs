import { is, log } from '@magic/test'

import { batch1, batch2} from '../src/index.mjs'

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
batch1 was ${log.paint('green', parseInt(100 - (time1 / time2) * 100))}% faster.`)

  return true
}

export default {
  unit: lists.map(t => ({
    fn: batch1(t),
    expect: is.deep.equal(batch2(t)),
  })),

  perf: lists.map(t => ({ fn: time(t) })),
}