<script setup lang="ts">
import { onMounted } from 'vue'
import txt0 from '../txt/笑傲江湖 (1).txt?raw'
import { getParams, runWithTime } from './debug'
import './loop'
import { globalData } from './utils'

const splitToLine = /(?<=[。！？])(?![”])|(?<=[。！？，]”)/
const splitToSection = /(?<=[，…—；：])/

type word = string
type section = word[] & { spk?: boolean }
type block = section[]
type line = block[]

const { all } = getParams()

const x = txt0.split('\r\n').slice(0, all ? 9999 : 90)

let spk = false
const datas: line[] = runWithTime(() =>
  x.map((line) =>
    line.split(splitToLine).map((block) =>
      block.split(splitToSection).map((section) => {
        const rs: section = [...section]

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

        return rs
      })
    )
  )
)

document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const { selectionsData, setSelectionsData, sectionDoms } = globalData

  if (query) {
    if (!(target.nodeName === 'SECTION')) return
    globalData.version++

    if (selectionsData.includes(query)) {
      setSelectionsData(selectionsData.filter((item) => item !== query))
    } else {
      setSelectionsData([...selectionsData, query])
    }
  } else {
    const { selection } = target.dataset
    const 原始位置 = target.offsetTop
    if (selection) {
      const 含有Sections = sectionDoms.filter((section) => section.textContent!.includes(selection))
      const 第一个Section = 含有Sections[0]
      const 末一个Section = 含有Sections[含有Sections.length - 1]
      const 下一个Section = 含有Sections.find((e) => e.offsetTop > 原始位置)
      const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < 原始位置)

      const jmp = (() => {
        if (shiftKey && ctrlKey) return 第一个Section
        if (ctrlKey) return 末一个Section
        if (shiftKey) return 上一个Section || 末一个Section
        return 下一个Section || 第一个Section
      })()

      document.documentElement.scrollBy({
        top: jmp.offsetTop - 原始位置,
        behavior: 'smooth',
      })
    }
  }
})

onMounted(() => {
  globalData.sectionDoms = Array.from(document.querySelectorAll('section'))
})
</script>

<template>
  <line v-for="line of datas">
    <block v-for="block of line">
      <section v-for="section of block" :class="section.spk && 'spk'">
        <word v-for="word of section">
          {{ word }}
        </word>
      </section>
    </block>
  </line>
</template>

<style scoped></style>
