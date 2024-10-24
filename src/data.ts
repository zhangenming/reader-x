import * as fflate from 'fflate'
import { reactive } from 'vue'

import { $, getParams, get屏幕宽度, get屏幕高度 } from './utils/utils'

console.log('data')

type datas = section[]
type section = period[]
type period = line[]
type line = {
  words: string
  spk: boolean
  lineIdx: number
  lineTop: number
  periodIdx: number
}

async function geneData(): Promise<datas> {
  let lineIdx = 0
  let P间隔Acc上一次: number
  let P间隔Acc = 0
  const P间隔高度 = 50

  const txt = (await import('../txt/一个叫欧维的男人决定去死.txt?raw')).default

  ;(window as any).fj = section2periods

  return txt
    .split(/\r*\n */)
    .filter((section) => section.trim())
    .map(section2periods)

  function section2periods(section: string, dbg: any) {
    let spk = false
    const periodFlag = '。！？…'

    // 分句
    const periods = [...section].reduce(
      (acc, cur, i, arr) => {
        acc[acc.length - 1] += cur

        const prev = arr[i - 1]
        const next = arr[i + 1]

        const 下一个下引号前面的字符 = arr[arr.indexOf('”', i) - 1]
        // 引号里面整体作为一句话
        if (cur === '“' && periodFlag.includes(下一个下引号前面的字符)) {
          spk = true
        }
        if ((periodFlag.includes(cur) && !periodFlag.includes(next)) || (periodFlag.includes(prev) && cur === '”')) {
          if (!spk && i !== arr.length - 1) {
            // console.log('p')
            acc.push('')
          }
        }
        if (periodFlag.includes(prev) && cur === '”') {
          spk = false
        }

        return acc
      },
      [' ', ''] // section之间的空行
    )

    if (dbg === undefined) {
      console.log(periods)
    }

    P间隔Acc上一次 = P间隔Acc
    P间隔Acc += periods.length - 1

    return periods.map(function period2lines(period, periodIdx) {
      let spk = false
      const allFlag = '。！？，—；：…”'
      return [...period]
        .reduce(
          (acc, cur, i, arr) => {
            acc[acc.length - 1] += cur

            const prev = arr[i - 1]
            const next = arr[i + 1]

            if (cur === '”') {
              if (allFlag.includes(prev)) {
                acc.push('')
              }
            } else if (allFlag.includes(cur) && !allFlag.includes(next)) {
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
          // console.error(e) // todo?
        })
        .map((line) => {
          if (line[0] === '“') {
            spk = true
            line = line.slice(1)
          }

          const rs = {
            words: '', // 待定
            lineIdx: lineIdx++,
            periodIdx,
            spk,
            lineTop: (P间隔Acc上一次 + periodIdx) * P间隔高度 + 50 * (lineIdx - 1),
          }

          if (spk) {
            line = '  ' + line
          }

          if (spk && line[line.length - 1] === '”') {
            spk = false
            line = line.slice(0, -1)
          }

          rs.words = line

          return rs
        })
    })
  }
}
async function withCache(): Promise<datas> {
  const cacheData = localStorage.getItem('data')
  if (cacheData && !getParams().cache) {
    console.log('hint Cache')

    return JSON.parse(fflate.strFromU8(fflate.decompressSync(fflate.strToU8(cacheData, true))))
  }

  console.log('geneData')
  const data = await geneData()
  localStorage.setItem('data', fflate.strFromU8(fflate.compressSync(fflate.strToU8(JSON.stringify(data))), true))
  return data
}

const data = await withCache()

export const datas = reactive(data)
export const allLines = data.flat(2) //所有的line引用
export const 各个Section的Top = datas.map((e) => e[0][0].lineTop)

export const 总高度 = allLines.at(-1)!.lineTop + 50
export const 外壳高度 = get屏幕高度() - (get屏幕高度() % 50) // snap布局对齐
export const 行容纳 = Math.floor(get屏幕宽度() / 50)
export const 列容纳 = Math.floor(get屏幕高度() / 50)

export const 滚动dom = $('#app')

// export const linesKeyMap = geneKeyMap(allLines)
// export const periodsKeyMap = geneKeyMap(datas.flat(1))
// export const sectionsKeyMap = geneKeyMap(datas)

// function geneKeyMap<T>(datas: T[]) {
//   const keyMap = new Map<T, number>()

//   for (let i = 0; i < datas.length; i++) {
//     const e = datas[i]
//     keyMap.set(e, i)
//   }

//   return keyMap
// }
