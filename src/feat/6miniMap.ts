import { watchEffect } from 'vue'

import { allLines, 总高度, 外壳高度 } from '../data'

import { rItemsData } from './3selectionAddR'
import { hoverR } from './4moveHover'

import { $ } from '../assets/utils'

watchEffect(() => {
  const data = rItemsData[hoverR.value] // vue 监控hoverR值变化事件

  if (!data) return // init vue watch

  $('#miniMap')!.style.boxShadow = [...new Set(data.map((e) => Number(e.split('-')[0])))] // 去重
    .map((lineIdx) => allLines[lineIdx].top)
    .map((高度) => (高度 / 总高度) * 外壳高度)
    .map((e) => Math.max(1, Math.round(e))) //取整防止模糊 但不小于1
    .map((e) => `red 0px ${e - 1}px 0px 0px`)
    .join(',')
})
