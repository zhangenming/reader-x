import txt0 from '../txt/沧浪之水 (阎真) (Z-Library).txt?raw'

import { useStorage } from '@vueuse/core'

type datas = section[]
type section = { v: period[]; totalTop: number }
type period = line[]
type line = {
  v: word[]
  totalLine: number
  raw: string
  spk?: boolean
  colorIndex: number[]
}
type word = string

let totalTop = 0
let totalLine = 0

export const datas = useStorage(
  'datas',
  txt0
    .split(/\r*\n */)
    .filter((e) => e.trim())
    .map(doLayout)
)
console.log(datas)

document.documentElement.style.height = totalLine * 50 + 'px'

function doLayout(txt: string): section {
  const section = {
    v: section2period(txt).map(period2line),
    totalTop: totalTop * 50,
  }
  totalTop = totalLine
  return section

  /*
 淋淋漓漓的鲜血写着六个大字：“出门十步者死”。
 */
  function section2period(section: string) {
    let spk = false
    const periodFlag = '。！？…'
    const periodFlag2 = '。！？…'
    return [...section].reduce(
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
      [' ', ''] // section之间的空行
    )
  }

  //   “文革”来了，父亲挨了斗，戴着尖尖的纸帽，敲着一面铜锣游街。
  //   后来人们就忘了他，抓“活老虎”“走资派”去了。
  function period2line(period: string) {
    let spk = false
    const allFlag = '。！？，—；：…'
    return [...period]
      .reduce(
        (acc, cur, i, arr) => {
          acc[acc.length - 1] += cur

          const next = arr[i + 1]

          if (allFlag.includes(cur) && !(allFlag + '”').includes(next)) {
            if (i !== arr.length - 1) {
              acc.push('')
            }
          }

          return acc
        },
        ['']
      )
      .filter((e) => {
        if (e) {
          return true
        }
        console.error(e) // todo?
      })
      .map((section) => {
        totalLine++

        const rs: line = { v: [...section], totalLine, raw: '', colorIndex: [] }

        if (rs.v[0] === '“') {
          spk = true
          rs.v.shift()
        }

        rs.spk = spk

        if (spk) {
          rs.v.unshift(' ')
          rs.v.unshift(' ')
        }

        if (spk && rs.v[rs.v.length - 1] === '”') {
          spk = false
          rs.v.pop()
        }

        rs.raw = rs.v.join('')

        return rs
      })
  }
}

export const allLine: line[] = datas.value.flatMap((section) => [...section.v]).flat()

export const RItems = useStorage('RItems', new Set<string>([]))
