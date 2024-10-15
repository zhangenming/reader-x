<script setup lang="ts">
import { allLine, datas, 每个section前面有几个line, 前面有几个margin } from './data' //.ts

import { startSection, endSection } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { $, getParams } from './assets/utils' //.ts
import { computed } from 'vue'

console.log('App.vue')

const allFirst = computed(() => Object.values(rItemsData).map((e) => e[0]))
const allLast = computed(() => Object.values(rItemsData).map((e) => e.at(-1)))

// 性能敏感
function getDomAttr(wordID: string) {
  let classs = ''

  if (rItemsData[hoverR.value]?.includes(wordID)) {
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
    rItemsDataKey: Object.entries(rItemsData).find(([k, v]) => v.includes(wordID))?.[0],
  }
}

$('#app').style.height = Math.floor(innerHeight / 50) * 50 + 'px'
</script>

<template>
  <!-- format diff -->
  <template v-if="getParams().static">
    <section v-for="section of datas.slice(0, 200)">
      <period v-for="period of section">
        <line v-for="{ words } of period">
          <word v-for="word of words">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </template>

  <!-- todo 逐行渲染/着色 -->
  <div
    v-else
    :style="{
      height: allLine.length * 50 + 'px',
      paddingTop: 每个section前面有几个line[startSection] + 前面有几个margin[startSection - 1] + 'px',
      width: 'fit-content',
      boxSizing: 'border-box',
    }"
  >
    <section v-for="(section, sIdx) of datas.slice(startSection, endSection)" :key="sIdx + startSection">
      <period v-for="period of section">
        <line v-for="{ words, lineIdx, spk } of period" v-bind="spk && { class: { spk } }">
          <word v-for="(word, wordIdx) of words" v-bind="getDomAttr(`${lineIdx}-${wordIdx}`)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>

  <component is="style" v-if="!getParams().home">
    <!--  -->
    html{ filter: opacity(2.3%); }
    <!--  -->
    html:hover{ filter: opacity(3%); }
    <!--  -->
  </component>
</template>

<style>
[word='的'] {
}
[ritemsdatakey] {
  color: red;
  cursor: pointer;
}
word:not([ritemsdatakey]) + word[ritemsdatakey]:not(:nth-child(3)),
word[ritemsdatakey] + word:not([ritemsdatakey]) {
  margin-left: 0.25rem;
}
.spk {
  /* background-color: #aea; */
  /* margin-left: 1em; */
  text-indent: 1em;
  font-weight: 100;
  font-family: cursive;
  font-style: italic;
}

.文案hover {
  color: white;
  background-color: red;
}

.first {
  box-shadow: inset red 3px 0px 0 0, inset red 0px 3px 0 0;
  border-radius: 10px 0 0 0;
}
.last {
  box-shadow: inset red -3px 0px 0 0, inset red 0px -3px 0 0;
  border-radius: 0 0 10px 0;
}
/*  */

section,
period,
line {
  display: block;
}

/* 为了保证页面不shift 不能margin 也不能bottom */
period + period {
  padding-top: 0.5rem;
}
line {
  /* display: inline-block; */
  width: fit-content;
  line-height: 1em;
}
</style>
