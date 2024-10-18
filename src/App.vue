<script setup lang="ts">
import { datas, 各个Section的Top, 总高度, 外壳高度, 行容纳 } from './data' //.ts

import { startSection, endSection } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { $, getParams } from './assets/utils' //.ts
import { computed } from 'vue'

console.log('App.vue')

// 计算 rItemsData 的所有值，避免重复调用 Object.values
const rItemsFlat = computed(() => Object.values(rItemsData))
const allFirst = computed(() => rItemsFlat.value.map((e) => e[0]))
const allLast = computed(() => rItemsFlat.value.map((e) => e.at(-1)))

// 性能敏感
function getDomAttr(lineIdx: number, wordIdx: number) {
  const wordID = `${lineIdx}-${wordIdx}`

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

$('#app').style.height = 外壳高度 + 'px'
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
      height: 总高度 + 'px',
      paddingTop: 各个Section的Top[startSection] + 'px',
      width: 'fit-content',
    }"
  >
    <section v-for="(section, sIdx) of datas.slice(startSection, endSection)" :key="sIdx + startSection">
      <period v-for="period of section">
        <line
          v-for="{ words, lineIdx, spk } of period"
          v-bind="spk && { class: { spk } }"
          :style="{
            fontSize: words.length > 行容纳 ? 100 / (words.length + 1) + 'vw' : undefined,
            // todo 需要减去旁白宽度 暂时+1
          }"
        >
          <word v-for="(word, wordIdx) of words" :word="word" v-bind="getDomAttr(lineIdx, wordIdx)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>

  <component is="style" v-if="!getParams().home" boss>
    line{ color:white;} line:hover{ color:#eee }
    <!--  -->
    [ritemsdatakey] { color: #eee; }
    <!--  -->
    .文案hover { background-color: #eee; }
  </component>
  <component is="style" 动态>
    {{
      (() => {
        const 连词 = '如果真假由于过以为没跟已经有无甚至又乃因此和与所即还再就把是不那做都在几竟到说'
        const 人称代词 = '他她它你我们您咱俺自己'
        const 指示代词 = '这那其'
        const 转折 = '更别可才反越否则但而虽然却且或非'
        const 语气词 = '只怎吧着什么呢'
        const 叹词 = '啊嗯哦哎'
        const 助词 = '了子'
        const 之乎者也 = '之乎者也'
        const 量词 = '每各个'
        const 的 = '的得地'
        return [...连词, ...人称代词, ...的, ...转折, ...指示代词, ...叹词, ...助词, ...语气词, ...之乎者也, ...量词]
      })()
        .map((e) => `[word='${e}']`)
        .join(',')
    }}
    { font-weight: 900; }
  </component>
</template>

<style>
html {
  font-size: 50px;
}
body {
  margin: 0;
  background: #829b92;
}

#app {
  background: white;
  user-select: none;
  font-family: fangsong;
  white-space: pre;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  /* margin-left: 10px; */
}

/*  */
#app::-webkit-scrollbar {
  width: 30px;
  height: 10px;
}

#app::-webkit-scrollbar-thumb {
  height: 1px;
  background-color: black;
}

#app::-webkit-scrollbar-thumb:hover {
  height: 50px;
}

@font-face {
  font-family: 'spkFont';
  /* src: url(https://cdn.jsdelivr.net/fontsource/fonts/ma-shan-zheng@latest/chinese-simplified-400-normal.ttf) format('truetype'); */
  src: url(./assets/描边.ttf) format('truetype');
}
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */

section,
period,
line {
  display: block;
  box-sizing: border-box;
}

period {
  width: fit-content;
}
/* 为了保证页面不shift 不能bottom */
period + period {
  margin-top: 1rem;
  /* P间隔高度 */
}
line {
  width: fit-content;
  height: 1rem;
}
line:hover {
  user-select: text;
}

.spk {
  font-weight: 100;
  font-family: spkFont;
  font-style: italic;
}
.spk > :nth-child(1),
.spk > :nth-child(2) {
  width: 1rem;
  display: inline-block;
}

/* word */

word:first-child {
  font-size: 1rem;
}

[ritemsdatakey] {
  color: red;
  cursor: pointer;
}

word:not([ritemsdatakey]):not([word=' ']) + word[ritemsdatakey] {
  margin-left: 0.25rem;
}
word[ritemsdatakey]:has(+ word:not([ritemsdatakey])) {
  margin-right: 0.25rem;
}

:not(.文案hover) + .文案hover {
  border-left: 1px solid red;
}
.文案hover:has(+ :not(.文案hover)) {
  border-right: 1px solid red;
}
.文案hover {
  border-top: 1px solid red;
  border-bottom: 1px solid red;
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
