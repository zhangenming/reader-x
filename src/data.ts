import txt from '../txt/沧浪之水 (阎真) (Z-Library).txt?raw'

import { reactive } from 'vue'

import { $, get屏幕高度 } from './assets/utils'

console.log('data')

type datas = section[]
type section = period[]
type period = line[]
export type line = {
  words: string
  spk: boolean
  lineIdx: number
  sectionIdx: number
  top: number
}

export const 各个Section的Top: number[] = []
let P间隔Acc上一次: number
let P间隔Acc = 0

export const datas = reactive<datas>(geneData()) // 没必要缓存
export const allLine = datas.flat(3) //所有的line引用
export const 总高度 = allLine.at(-1)!.top + 50
export const 外壳高度 = Math.floor(get屏幕高度() / 50) * 50

function geneData() {
  let lineIdx = 0

  return txt
    .split(/\r*\n */)
    .filter((e) => e.trim())
    .map(function doLayout(section, sectionIdx) {
      // 从上往下分
      // todo 从下往上 先把所有标点分割 再取消不必要的分割
      return section2period(section).map(period2line)

      function section2period(section: string) {
        let spk = false
        const periodFlag = '。！？…'

        const rs = [...section].reduce(
          (acc, cur, i, arr) => {
            acc[acc.length - 1] += cur

            const prev = arr[i - 1]
            const next = arr[i + 1]

            const 下一个下引号前面的字符 = arr[arr.indexOf('”', i) - 1]
            // 引号里面整体作为一句话
            if (cur === '“' && periodFlag.includes(下一个下引号前面的字符)) {
              spk = true
            }
            if ((!spk && periodFlag.includes(cur) && !periodFlag.includes(next)) || (periodFlag.includes(prev) && cur === '”')) {
              if (i !== arr.length - 1) {
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

        各个Section的Top.push(lineIdx * 50 + P间隔Acc * 25)
        P间隔Acc上一次 = P间隔Acc
        P间隔Acc += rs.length - 1
        return rs
      }

      function period2line(period: string, periodIdx: number) {
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
              spk,
              sectionIdx,
              top: (P间隔Acc上一次 + periodIdx) * 25 + 50 * (lineIdx - 1),
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
      }
    })
}

export const 滚动dom = $('#app')
