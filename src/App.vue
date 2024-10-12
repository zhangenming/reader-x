<script setup lang="ts">
import { allLine, datas, 每个section前面有几个line } from './data' //.ts

import { startSection, endSection } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData, rItemsDataKey, rItemsFL } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { getParams } from './assets/utils' //.ts

if (getParams().home) {
  document.documentElement.style.color = 'black'
}

console.log('App.vue')

function getDomAttr(lineIdx: number, wordIdx: number) {
  const idx = `${lineIdx}-${wordIdx}`
  const rItem = rItemsData[lineIdx]?.[wordIdx]

  const style: Record<string, string> = {}

  if (rItem?.includes(hoverR.value)) {
    applyCss('color:#888')
  } else if (rItem?.length) {
    applyCss('color:#eee')
  }

  if (rItemsFL.first[idx]) {
    applyCss('box-shadow: red -1px 0px 0 0, red 0px -1px 0 0')
  }
  if (rItemsFL.last[idx]) {
    applyCss('box-shadow: red 1px 0px 0 0, red 0px 1px 0 0')
  }

  return {
    style,
    [rItemsDataKey]: rItem,
  }

  function applyCss(css: string) {
    const [prop, val] = css.split(':')
    style[prop] = val
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
          <word v-for="(word, wordIdx) of words" v-bind="getDomAttr(lineIdx, wordIdx)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>
</template>
