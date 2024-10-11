<script setup lang="ts">
import { allLine, datas, 每个section前面有几个line } from './data' //.ts

import { startSection, endSection } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData, rItemsDataKey } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { getParams } from './assets/utils' //.ts

if (getParams().home) {
  document.documentElement.style.color = 'black'
}

console.log('App.vue')

function getDomAttr(lineIdx: number, wordIdx: number) {
  const rItem = rItemsData[lineIdx]?.[wordIdx]

  const style = (() => {
    if (!rItem) return

    if (rItem.includes(hoverR.value)) {
      return {
        color: '#888',
      }
    }

    if (rItem.length) {
      return {
        color: '#eee',
      }
    }
  })()

  return { style, [rItemsDataKey]: rItem }
}
</script>

<template>
  <!-- todo 逐行渲染/着色 -->
  <div
    :style="{
      height: allLine.length * 50 + 'px',
      paddingTop: 每个section前面有几个line[startSection] + 'px',
    }"
  >
    <section
      v-for="(section, sIdx) of datas.slice(startSection, endSection)"
      :key="sIdx + startSection"
    >
      <period v-for="period of section">
        <line v-for="{ words, lineIdx, spk } of period" v-bind="spk && { class: { spk } }">
          <word v-for="(word, wordIdx) of words" v-bind="getDomAttr(lineIdx, wordIdx)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>
</template>
