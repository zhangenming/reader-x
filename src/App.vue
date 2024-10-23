<script setup lang="ts">
import { datas, 各个Section的Top, 总高度, 外壳高度, 滚动dom } from './data' //.ts

import { startSection, renderDatas } from './feat/1虚拟scroll' //.ts
import './feat/2nextPage' //.ts
import { rItemsData, rItemsDataWordID } from './feat/3selectionAddR' //.ts
import { hoverR } from './feat/4moveHover' //.ts
import './feat/5clickJump' //.ts
import './feat/6miniMap' //.ts

import { $, $$, getParams } from './assets/utils' //.ts
import { computed } from 'vue'

console.log('App.vue')

// 计算 rItemsData 的所有值，避免重复调用 Object.values
const rItemsFlat = computed(() => Object.values(rItemsData))
const allFirst = computed(() => rItemsFlat.value.map((e) => e[0]))
const allLast = computed(() => rItemsFlat.value.map((e) => e.at(-1)))

// 性能敏感
function getDomAttr(lineIdx: number, wordIdx: number, spk: boolean) {
  const wordID = `${lineIdx}-${wordIdx}`

  let classs = ''

  if (allFirst.value.includes(wordID)) {
    classs += 'first '
  }
  if (allLast.value.includes(wordID)) {
    classs += 'last '
  }

  if (wordIdx === (spk ? 2 : 0)) {
    classs += 'lineFirst '
  }

  return {
    rItemsDataKey: rItemsDataWordID.value[wordID],
    class: classs || undefined,
  }
}

$('#app').style.height = 外壳高度 + 'px'

let prev = 0
function getDomLength() {
  const cur = $$(' *').length
  const diff = cur - prev
  prev = cur
  return diff
}

// 统计每帧dom变化
// let i = 0
// let domLength = getDomLength()
// domLength && console.time(i + ' ' + domLength)
// requestAnimationFrame(function f() {
//   domLength && console.timeEnd(i + ' ' + domLength)
//   domLength = getDomLength()
//   domLength && i++
//   domLength && console.time(i + ' ' + domLength)

//   requestAnimationFrame(f)
// })

// document.onclick = () => {
//   // 滚动dom.scrollTop += 1
//   console.log('document')
// }

// document.documentElement.onclick = (e) => {
//   console.log('document.documentElement')
//   e.stopPropagation()
//   e.stopImmediatePropagation()
//   滚动dom.scrollTop += 1
// }

// document.body.onclick = (e) => {
//   console.log('document.body')
//   e.stopPropagation()
//   e.stopImmediatePropagation()
//   滚动dom.scrollTop -= 1
// }
// window.onclick = () => {
//   console.log('window')
// }
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
      paddingTop: renderDatas[0]?.[0][0].lineTop + 'px',
      width: 'fit-content',
    }"
  >
    <section v-for="(section, sIdx) of renderDatas" :key="startSection + sIdx" :i="startSection + sIdx">
      <period v-for="period of section" :key="period[0].periodIdx" :i="period[0].periodIdx">
        <line
          v-for="{ words, spk, lineIdx } of period"
          :key="lineIdx"
          :i="lineIdx"
          v-bind="spk && { class: { spk } }"
          :style="{
            fontSize: `clamp(16px, ${100 / (words.length + (spk ? 3 : 1))}vw, 50px)`,
          }"
        >
          <word v-for="(word, wordIdx) of words" :word="word" v-bind="getDomAttr(lineIdx, wordIdx, spk)">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>

  <component is="style" v-if="!getParams().home" boss>
    line{ color:#eee5;} line:hover{ color:#eee }
    <!--  -->
    [ritemsdatakey] { color: #eee; }
    <!--  -->
    word{text-shadow: unset!important;}
  </component>
  <component is="style" 动态>
    {{
      (() => {
        const 连词 = '以就是还再' //'连则如果真假由于过以为没跟已经有甚至乃因此和与所即把做都在几竟说'
        const 动词 = '到'
        const 人称代词 = '他她它你们您咱俺自己'
        const 指示代词 = '这那其此'
        const 转折 = '又更可才越但而虽然却且或'
        const 否定 = '否不没无非勿别反'
        const 语气词 = '只怎吧着什么呢'
        const 叹词 = '啊嗯哦哎'
        const 助词 = '子' // 了
        const 之乎者也 = '之乎者也'
        const 量词 = '每各' //个
        const 的 = '得地' // 的
        return [...连词, ...动词, ...人称代词, ...的, ...转折, ...否定, ...指示代词, ...叹词, ...助词, ...语气词, ...之乎者也, ...量词]
      })()
        .map((e) => `[word='${e}']`)
        .join(',')
    }}
    { font-weight: 900; }

    {{
      `
     :not([ritemsdatakey*="${hoverR}"]) + [ritemsdatakey*="${hoverR}"] { border-left: 1px solid red; }
     [ritemsdatakey*="${hoverR}"]:has(+ :not([ritemsdatakey*="${hoverR}"])) { border-right: 1px solid red; }
     [ritemsdatakey*="${hoverR}"] { border-top: 1px solid red; border-bottom: 1px solid red; }
      `
    }}
  </component>
</template>

<style>
/* liao不需要 */
/* [word='了'] + 名词 */
[word='了']:not(:has(+ :is([word='个'], [word='却']))),
[word='的'],
[word='个']:not(:has(+ :is([word='个']))),
:not([word='了']) + [word='我']:not(:is(.lineFirst, :has(+ :is([word='的'], [word='们'])))) {
  margin-right: 0.5em;
}

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
  background-color: blue;
}

#app::-webkit-scrollbar-thumb:hover {
  height: 50px;
}

@font-face {
  font-family: 'spkFont';
  src: url(./assets/font/包图小白体.ttf) format('truetype');
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
line,
div {
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
  /* font-weight: 100; */
  font-family: spkFont, fangsong;
  /* font-style: italic; */
}
.spk > :nth-child(1),
.spk > :nth-child(2) {
  font-size: 1rem;
  width: 1rem;
  display: inline-block;
}

/* word */
.lineFirst {
  font-size: 1rem;
}

[ritemsdatakey] {
  cursor: pointer;
  /* font-weight: 900; */
  color: red;
  text-shadow: 2px 2px 5px #00e5ff;
}

/* word:not([ritemsdatakey]):not([word=' ']) + word[ritemsdatakey] {
  margin-left: 0.25rem;
}
word[ritemsdatakey]:has(+ word:not([ritemsdatakey])) {
  margin-right: 0.25rem;
} */

.first {
  box-shadow: inset red 3px 0px 0 0, inset red 0px 3px 0 0;
  border-radius: 10px 0 0 0;
}
.last {
  box-shadow: inset red -3px 0px 0 0, inset red 0px -3px 0 0;
  border-radius: 0 0 10px 0;
}
</style>
