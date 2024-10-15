<script setup lang="ts">
import { ref } from 'vue'
import { datas, 滚动dom } from './data' //.ts
import { $$, get屏幕高度 } from './assets/utils'

let sectionIdx = ref(102)
let periodIdx = ref(1)

function get溢出dom() {
  return $$('period').find((period) => {
    return period.offsetTop + period.offsetHeight > 滚动dom.scrollTop + get屏幕高度()
  })
}

document.onclick = function next() {
  const 溢出dom = get溢出dom()

  if (溢出dom) {
    溢出dom.scrollIntoView({
      behavior: 'smooth',
    })
  } else {
    滚动dom.scrollTop = 0
    sectionIdx.value++
  }
}

datas.xx
</script>

<template>
  <period v-for="(period, pIdx) of datas[sectionIdx].slice(1)">
    <line v-for="{ words, lineIdx, spk } of period" v-bind="spk && { class: { spk } }">
      <word v-for="(word, wordIdx) of words" :word>
        {{ word }}
      </word>
    </line>
  </period>
</template>

<style>
html {
  user-select: none;
  /* font-size: 5px !important; */
}
word {
  color: #fff;
}

section,
period,
line {
  display: block;
}
period {
  margin-bottom: 1rem;
}

line {
  /* display: inline-block; */
  width: fit-content;
  line-height: 1em;
}
</style>
