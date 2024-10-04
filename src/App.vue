<script setup lang="ts">
import { onMounted } from 'vue'
import txt0 from '../txt/笑傲江湖 (1).txt?raw'
import { getParams, runWithTime } from './debug'
import './loop'
import { findAllIndex, globalData, RItems, setHoverR, upVersion } from './utils'

const splitToSection = /(?<=[。！？，—；：])/

type datas = line[]
type line = block[]
type block = section[]
type section = word[] & { raw: string; spk?: boolean }
type word = { word: string; R: string[] }

const { all } = getParams()

const x = txt0.split('\r\n').slice(0, all ? 1999 : 290)

let spk = false
// todo vue data
const datas: datas = runWithTime(() =>
  x.map((line) =>
    line2block(line).map((block) =>
      block
        .split(splitToSection)
        .filter(Boolean)
        .map((section) => {
          const rs = [...section]
            .filter((e) => e !== '，')
            .map((word) => ({ word, R: [] })) as unknown as section
          rs.raw = section

          if (rs[0].word === '“') {
            spk = true
            rs.shift()
          }

          rs.spk = spk

          // if (spk) {
          //   rs.unshift('   ')
          //   rs.unshift('   ')
          // }

          if (spk && rs[rs.length - 1].word === '”') {
            rs.pop()
            spk = false
          }

          return rs
        })
    )
  )
)

const blockFlag = '。！？…'
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

const allSectionsData = datas.flat(2)
document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const { sectionDoms } = globalData
  const {
    nodeName,
    dataset: { selection },
    offsetTop,
  } = target

  if (query) {
    if (!(nodeName === 'SECTION')) return
    upVersion()

    if (RItems.value.has(query)) {
      RItems.value.delete(query)
    } else {
      RItems.value.add(query)
      allSectionsData.forEach((section) => {
        findAllIndex(section.raw, query).forEach((index) => {
          section[index].R.push(query)
        })
      })
    }
  } else {
    if (selection) {
      const 含有Sections = sectionDoms.filter((section) => section.textContent!.includes(selection))
      const 第一个Section = 含有Sections[0]
      const 末一个Section = 含有Sections[含有Sections.length - 1]
      const 下一个Section = 含有Sections.find((e) => e.offsetTop > offsetTop)
      const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < offsetTop)

      const jmp = (() => {
        if (shiftKey && ctrlKey) return 第一个Section
        if (ctrlKey) return 末一个Section
        if (shiftKey) return 上一个Section || 末一个Section
        return 下一个Section || 第一个Section
      })()

      document.documentElement.scrollBy({
        top: jmp.offsetTop - offsetTop,
        behavior: 'smooth',
      })
    }
  }
})

document.addEventListener('mousemove', (e) => {
  const { target } = e
  if (!(target instanceof HTMLElement)) return
  setHoverR(target.dataset.selection!)
})

onMounted(() => {
  globalData.sectionDoms = Array.from(document.querySelectorAll('section'))
})
</script>

<template>
  <line v-for="line of datas">
    <block v-for="block of line">
      <section v-for="section of block" :class="section.spk && 'spk'">
        <word v-for="word of section" :style="word.R?.length ? 'color:red' : ''">
          {{ word.word }}
        </word>
      </section>
    </block>
  </line>
</template>

<style scoped></style>
