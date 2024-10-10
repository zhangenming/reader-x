<script setup lang="ts">
import { allLine, datas, rItemsData, 每个section前面有几个line } from './data.ts'

import { startSection, endSection } from './feat/虚拟scroll.ts'
import './feat/nextPage.ts'
import './feat/click.ts'

import { getParams } from './assets/utils.ts'

if (getParams().home) {
  document.documentElement.style.color = 'black'
}

document.documentElement.style.height = allLine.length * 50 + 'px'

console.log('App.vue')

// let oldS
// let oldP
// let oldL
// let oldW
// onUpdated(() => {
//   console.log(
//     document.querySelectorAll('section').length - oldS,
//     document.querySelectorAll('period').length - oldP,
//     document.querySelectorAll('line').length - oldL,
//     document.querySelectorAll('word').length - oldW
//   )
//   oldS = document.querySelectorAll('section').length
//   oldP = document.querySelectorAll('period').length
//   oldL = document.querySelectorAll('line').length
//   oldW = document.querySelectorAll('word').length
// })
</script>

<template>
  <template v-if="getParams().static">
    <section v-for="section of datas">
      <period
        v-for="period of section"
        :style="{ containIntrinsicSize: period.length * 50 + 'px' }"
      >
        <line v-for="line of period">
          <word v-for="word of line">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>

  <!-- todo 逐行渲染/着色 -->
  <template v-else>
    <section
      v-for="(section, sIdx) of datas.slice(startSection, endSection)"
      :key="sIdx + startSection"
      :style="{ marginTop: sIdx === 0 ? 每个section前面有几个line[startSection] + 'px' : '' }"
    >
      <period v-for="period of section">
        <line v-for="{ words, lineIdx } of period">
          <word
            v-for="(word, wordIdx) of words"
            :style="rItemsData[lineIdx]?.[wordIdx]?.length && { color: '#eee' }"
            :R="rItemsData[lineIdx]?.[wordIdx]?.join()"
          >
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>
</template>
