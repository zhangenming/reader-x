import txt0 from '../txt/沧浪之水 (阎真) (Z-Library).txt?raw'
import { runWithTime } from './debug'

import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { local } from './feat/store'

type datas = section[]
type section = { sectionV: period[]; totalTop: number }
type period = line[]
type line = {
  lineV: string
  spk?: boolean
  lineIdx: number
}

export const datas = reactive(await local('datas', geneData, 11))
export const allLine: line[] = datas.flatMap((section) => [...section.sectionV]).flat()

function geneData() {
  console.log('geneData')

  let totalTop = 0
  let totalLine = 0
  let lineIdx = 0

  return txt0
    .split(/\r*\n */)
    .filter((e) => e.trim())
    .map(function doLayout(txt) {
      const section: section = {
        sectionV: section2period(txt).map(period2line),
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

            const rs: line = {
              lineV: '',
              lineIdx: lineIdx++,
            }

            if (section[0] === '“') {
              spk = true
              section = section.slice(1)
            }

            rs.spk = spk

            if (spk) {
              section = '  ' + section
            }

            if (spk && section[section.length - 1] === '”') {
              spk = false
              section = section.slice(0, -1)
            }

            rs.lineV = section

            return rs
          })
      }
    })
}

export const RItems = useStorage('RItems', new Set<string>([]))

export const itemRdata = reactive<Record<number, any>>(await local('itemRdata', () => ({}), 11))
