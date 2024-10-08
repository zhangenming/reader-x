<script setup lang="ts">
import { onMounted } from 'vue'
import { $$, RItems, setupSectionScroll, setHoverR, upVersion } from './utils'
import { datas } from './data'
import './feat/nextPage'
import { startSection, endSection, endLine, appScrollTop } from './feat/scroll'
import { getParams } from './debug'

const { static: isStatic } = getParams()

document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const {
    nodeName,
    offsetTop,
    dataset: { selection },
  } = target

  if (query) {
    if (!(nodeName === 'SECTION')) return
    RItems.value.has(query) ? RItems.value.delete(query) : RItems.value.add(query)
    upVersion()
  } else if (selection) {
    const 含有Sections = $$('section').filter((section) => section.textContent!.includes(selection))
    const 第一个Section = 含有Sections[0]
    const 末一个Section = 含有Sections[含有Sections.length - 1]
    const 下一个Section = 含有Sections.find((e) => e.offsetTop > offsetTop)
    const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < offsetTop)

    const jmp = (() => {
      if (shiftKey && ctrlKey) return 第一个Section
      if (ctrlKey) return 末一个Section
      if (shiftKey) return 上一个Section || 末一个Section
      return 下一个Section || 第一个Section
    })()

    document.documentElement.scrollBy({
      top: jmp.offsetTop - offsetTop,
      behavior: 'smooth',
    })
  }
})

document.addEventListener('mousemove', (e) => {
  const { target } = e
  if (!(target instanceof HTMLElement)) return
  setHoverR(target.dataset.selection!)
})

//   paragraph  sentence  verse section period line   phrase
// 段落(语义) 段落/txt原始文本/回车 句子/句号 行/片/标点
</script>

<template>
  <div v-if="isStatic" class="isStatic">
    <section v-for="section of datas">
      <period v-for="period of section">
        <line v-for="line of period">
          <word v-for="word of line">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>

  <div v-if="!isStatic" :style="{ top: datas[startSection].totalTop + 'px', position: 'absolute' }">
    <section v-for="section of datas.slice(startSection, endSection)" :key="section.totalTop">
      <period v-for="period of section">
        <line
          v-for="line of period.filter((line) => line.totalLine < endLine)"
          :class="line.spk && 'spk'"
        >
          <word v-for="word of line">
            {{ word }}
          </word>
        </line>
      </period>
    </section>
  </div>
</template>
