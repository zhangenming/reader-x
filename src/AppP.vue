<script setup lang="ts">
import { ref } from 'vue'
import { datas } from './data' //.ts

let sectionIdx = ref(100)
let periodIdx = ref(1)

document.onclick = function add() {
  periodIdx.value++
  if (periodIdx.value === datas[sectionIdx.value].length) {
    periodIdx.value = 1
    sectionIdx.value++
  }
}

datas.xx
</script>

<template>
  <!-- {{ sectionIdx }} -- {{ periodIdx }} -->
  <period
    v-for="(period, pIdx) of datas[sectionIdx]"
    :style="
      pIdx === periodIdx && {
        fontSize: 50 + 'px',
      }
    "
  >
    <line v-for="{ words, lineIdx, spk } of period" v-bind="spk && { class: { spk } }">
      <word v-for="(word, wordIdx) of words">
        {{ word }}
      </word>
    </line>
  </period>
</template>

<style>
html {
  font-size: 5px !important;
}
word {
  color: #eee6;
}

section,
period,
line {
  display: block;
}
period:nth-child(2n + 3) {
  display: block;
  box-shadow: -10px 0px 0 0 #eee;
}
line {
  /* display: inline-block; */
  width: fit-content;
  line-height: 1em;
}
</style>
