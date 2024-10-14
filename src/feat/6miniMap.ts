import { watchEffect } from 'vue'

import { hoverR } from './4moveHover'
import { $, get屏幕高度 } from '../assets/utils'
import { rItemsData } from './3selectionAddR'
import { allLine } from '../data'

watchEffect(() => {
  const v = hoverR.value // vue 监控hoverR值变化事件

  if (!v) return // init vue watch

  const q = allLine.at(-1)!.lineIdx

  $('#miniMap')!.style.boxShadow = [...new Set(rItemsData[v].map((e) => e.split('-')[0]))] // 去重
    .map((lineIdx) => (Number(lineIdx) / q) * get屏幕高度())
    .map((e) => Math.max(1, Math.floor(e))) //向下取整 但不小于1
    .map((x) => `red 0px ${x}px 0px 0px`)
    .join(',')
})
