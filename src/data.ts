import txt0 from '../txt/沧浪之水 (阎真) (Z-Library).txt?raw'

import { reactive } from 'vue'

import { getParams } from './debug'

type datas = section[]
type section = period[] & { totalTop: number }
type period = line[]
type line = word[] & { totalLine: number; spk?: boolean }
type word = string

const { chunk } = getParams()

const d = txt0.split(/\r*\n */).filter((e) => e.trim())
const x = d.slice(0, d.length / (chunk === false ? 100 : Number(chunk)))

let totalTop = 0
let totalLine = 0

export const datas = reactive(x.map(doLayout))

document.documentElement.style.height = totalLine * 50 + 'px'

function doLayout(txt: string) {
  const section = section2period(txt).map(period2line) as section
  section.totalTop = totalTop * 50
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

        const rs: line = Object.assign([...section], { totalLine }) //.filter((e) => e !== '，'),

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
