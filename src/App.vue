<script setup lang="ts">
import { datas } from './data'
import { getParams } from './utils'

import './feat/nextPage'
import { startSection, endSection } from './feat/虚拟scroll'

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

  <template v-else>
    <section
      v-for="(section, i) of datas.slice(startSection, endSection)"
      :i="i + startSection"
      :key="section.totalTop"
      :style="{ marginTop: i === 0 ? datas[startSection].totalTop + 'px' : '' }"
    >
      <period v-for="period of section">
        <line v-for="line of period">
          <word v-for="word of line">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>
</template>
