<script setup lang="ts">
import { datas } from './data'
import { getParams } from './utils'

import { startSection, endSection } from './feat/虚拟scroll'
import './feat/nextPage'
import './feat/click' // 修改 colorIndex

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

//   paragraph  sentence  verse section period line   phrase
// 段落(语义) 段落/txt原始文本/回车 句子/句号 行/片/标点

// datas[0][1][0].colorIndex.push(0)
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
      v-for="(section, i) of datas.slice(startSection, endSection)"
      :key="i + startSection"
      :style="{ marginTop: i === 0 ? datas[startSection].totalTop + 'px' : '' }"
    >
      <period v-for="period of section">
        <line v-for="line of period">
          <word
            v-for="(word, idx) of line"
            :style="line.colorIndex.includes(idx) && { color: 'red' }"
          >
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>
</template>
