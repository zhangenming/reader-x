import txt from '../txt/沧浪之水 (阎真) (Z-Library).txt?raw'

import { reactive } from 'vue'
import { $ } from './assets/utils'

console.log('data')

type datas = section[]
type section = period[]
type period = line[]
type line = {
  words: string
  spk: boolean
  lineIdx: number
}

export const 每个section前面有几个line: number[] = []
export const datas = reactive<datas>(geneData()) // 没必要缓存
export const allLine = datas.flat(3) //所有的line引用

export { txt }

function geneData() {
  let lineIdx = 0

  return txt
    .split(/\r*\n */)
    .filter((e) => e.trim())
    .map(function doLayout(txt) {
      return section2period(txt).map(period2line)

      function section2period(section: string) {
        let spk = false
        const periodFlag = '。！？…'
        const periodFlag2 = '。！？…'
        每个section前面有几个line.push(lineIdx * 50)

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

      function period2line(period: string) {
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
// console.log(rItemsData, JSON.stringify(rItemsData.value).length)
