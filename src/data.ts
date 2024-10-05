import txt0 from '../txt/生死疲劳.txt?raw'

import { reactive } from 'vue'

import { getParams } from './debug'

type datas = line[]
type line = period[]
type period = section[]
type section = word[] & { spk?: boolean }
type word = string

const { chunk } = getParams()

const d = txt0.split(/\r\n */)
const x = d.slice(0, d.length / (chunk === false ? 100 : Number(chunk)))

export const datas = reactive(x.map(doLayout))

function doLayout(txt: string) {
  return line2period(txt).map(period2setion)

  /*
 淋淋漓漓的鲜血写着六个大字：“出门十步者死”。
 */
  function line2period(line: string): string[] {
    let spk = false
    const periodFlag = '。！？…'
    const periodFlag2 = '。！？…'
    return [...line].reduce(
      (acc, cur, i, arr) => {
        acc[acc.length - 1] += cur

        const prev = arr[i - 1]
        const next = arr[i + 1]

        const 下一个下引号前面的字符 = arr[arr.indexOf('”', i) - 1]
        // 引号里面整体作为一句话
        if (cur === '“' && periodFlag.includes(下一个下引号前面的字符)) {
          spk = true
        }
        if (
          (!spk && periodFlag.includes(cur) && !periodFlag.includes(next)) ||
          (periodFlag2.includes(prev) && cur === '”')
        ) {
          if (i !== arr.length - 1) {
            // console.log('p')
            acc.push('')
          }
        }
        if (periodFlag2.includes(prev) && cur === '”') {
          spk = false
        }

        return acc
      },
      ['']
    )
  }

  function period2setion(period: string) {
    let spk = false
    const allFlag = '。！？，—；：…'
    return [...period]
      .reduce(
        (acc, cur, i, arr) => {
          acc[acc.length - 1] += cur

          const prev = arr[i - 1]
          const next = arr[i + 1]

          if (
            (allFlag.includes(cur) && !allFlag.includes(next) && next !== '”') ||
            (next === '”' && allFlag.includes(prev))
          ) {
            if (i !== arr.length - 1) {
              acc.push('')
            }
          }

          return acc
        },
        ['']
      )
      .filter(Boolean)
      .map((section) => {
        const rs: section = [...section] //.filter((e) => e !== '，'),

        if (rs[0] === '“') {
          spk = true
          rs.shift()
        }

        rs.spk = spk

        if (spk) {
          rs.unshift(' ')
          rs.unshift(' ')
        }

        if (spk && rs[rs.length - 1] === '”') {
          spk = false
          rs.pop()
        }

        return rs
      })
  }
}

export const allSectionsData = datas.flat(2)

// watchEffect(() => {
//   console.log(1, datas[2][1][1][14].R)
// })

// effect(() => {
//   console.log(2, datas[2][1][1][14].R)
// })

// watch(datas, () => {
//   console.log(3, datas)
// })

// setTimeout(() => {
//   datas[2][1][1][14].R.add('1')
// }, 100)
// setTimeout(() => {
//   datas[2][1][1][14].R.add('21')
// }, 200)
