<script setup lang="ts">
import { allLine, datas, itemRdata, 每个section前面有几个line } from './data'
import { getParams } from './utils'

import { startSection, endSection } from './feat/虚拟scroll'
import './feat/nextPage'
import './feat/click' // 修改 colorIndex

document.documentElement.style.height = allLine.length * 50 + 'px'
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
      v-for="(section, sI) of datas.slice(startSection, endSection)"
      :key="sI + startSection"
      :style="{ marginTop: sI === 0 ? 每个section前面有几个line[startSection] + 'px' : '' }"
    >
      <period v-for="period of section">
        <line v-for="line of period">
          <word
            v-for="(word, wI) of line.words"
            :style="itemRdata[line.lineIdx]?.[wI] && { color: 'red' }"
            :R="itemRdata[line.lineIdx]?.[wI]?.join()"
          >
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>
</template>
