import txt0 from '../txt/笑傲江湖 (1).txt?raw'

import { reactive } from 'vue'

import { getParams } from './debug'

const splitToSection = /(?<=[。！？，—；：])/
const blockFlag = '。！？…'

type datas = line[]
type line = block[]
type block = section[]
type section = word[] & { spk?: boolean }
type word = string

const { all } = getParams()

const x = txt0.split('\r\n').slice(0, all ? (all === true ? undefined : Number(all)) : 100)
const xx = x.map((line) => line2block(line).map(block2setion))
export const datas = reactive(xx)

function line2block(line: string): string[] {
  let spk = false
  return [...line].reduce(
    (acc, cur, i, arr) => {
      acc[acc.length - 1] += cur

      if (cur === '“') {
        spk = true
      }
      if (
        i !== arr.length - 1 &&
        ((!spk && blockFlag.includes(cur)) || (blockFlag.includes(arr[i - 1]) && cur === '”'))
      ) {
        acc.push('')
      }
      if (blockFlag.includes(arr[i - 1]) && cur === '”') {
        spk = false
      }

      return acc
    },
    ['']
  )
}

function block2setion(block: string) {
  let spk = false
  return block
    .split(splitToSection)
    .filter(Boolean)
    .map((section) => {
      const rs: section = Object.assign(
        [...section].filter((e) => e !== '，'),
        {
          content: '',
        }
      )

      if (rs[0] === '“') {
        spk = true
        rs.shift()
      }

      rs.spk = spk

      // if (spk) {
      //   rs.unshift('   ')
      //   rs.unshift('   ')
      // }

      if (spk && rs[rs.length - 1] === '”') {
        rs.pop()
        spk = false
      }

      // rs.content = rs.map((e) => e).join('')

      return rs
    })
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
