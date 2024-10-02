<script setup lang="ts">
import txt0 from '../txt/笑傲江湖 (1).txt?raw'
import { runWithTime } from './debug'
import './loop'
import { globalData } from './utils'

const splitToLine = /(?<=[。！？])(?![”])|(?<=[。！？，]”)/
const splitToSection = /(?<=[，…—；：])/

type word = string
type section = word[] & { spk?: boolean }
type block = section[]
type line = block[]
const x = txt0.split('\r\n').slice(0, 900)

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
  const { target } = e

  const query = getSelection() + ''
  getSelection()!.empty()

  if (query) {
    if (!((target as any).nodeName === 'SECTION')) return
    const { setVersion, getVersion, selectionsData, setSelectionsData } = globalData
    setVersion(getVersion() + 1)
    if (selectionsData.includes(query)) {
      setSelectionsData(selectionsData.filter((item) => item !== query))
    } else {
      setSelectionsData([...selectionsData, query])
    }
  }
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
