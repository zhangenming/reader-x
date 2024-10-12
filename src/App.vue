<script setup lang="ts">
import { allLine, datas, 每个section前面有几个line } from './data' //.ts

import { startSection, endSection } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData, rItemsDataKey } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { getParams } from './assets/utils' //.ts
import { computed } from 'vue'

if (getParams().home) {
  document.documentElement.style.color = 'black'
}

console.log('App.vue')

const t = computed(() => Object.values(rItemsData))
const all高亮坐标 = computed(() => t.value.flatMap((e) => e.wordIdx))
const allFirst = computed(() => t.value.map((e) => e.first))
const allLast = computed(() => t.value.map((e) => e.last))

// 性能敏感
function getDomAttr(wordID: string) {
  let classs = ''

  if (all高亮坐标.value.includes(wordID)) {
    classs += '文案 '
  }
  if (rItemsData[hoverR.value]?.wordIdx.includes(wordID)) {
    classs += '文案hover '
  }
  if (allFirst.value.includes(wordID)) {
    classs += 'first '
  }
  if (allLast.value.includes(wordID)) {
    classs += 'last '
  }

  return {
    class: classs || undefined,
    [rItemsDataKey]: Object.entries(rItemsData).find(([k, v]) => v.wordIdx.includes(wordID))?.[0],
  }
}
</script>

<template>
  <!-- todo 逐行渲染/着色 -->
  <div
    :style="{
      height: allLine.length * 50 + 'px',
      paddingTop: 每个section前面有几个line[startSection] + 'px',
      width: 'fit-content',
      boxSizing: 'border-box',
    }"
  >
    <section
      v-for="(section, sIdx) of datas.slice(startSection, endSection)"
      :key="sIdx + startSection"
    >
      <period v-for="period of section">
        <line v-for="{ words, lineIdx, spk } of period" v-bind="spk && { class: { spk } }">
          <word v-for="(word, wordIdx) of words" v-bind="getDomAttr(`${lineIdx}-${wordIdx}`)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>
</template>

<style>
.文案 {
  color: #eee;
}
.文案hover {
  color: #111;
}

.first {
  box-shadow: inset red 3px 0px 0 0, inset red 0px 3px 0 0;
  border-radius: 10px 0 0 0;
}
.last {
  box-shadow: inset red -3px 0px 0 0, inset red 0px -3px 0 0;
  border-radius: 0 0 10px 0;
}
</style>
