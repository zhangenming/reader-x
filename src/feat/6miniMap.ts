import { computed, watchEffect } from 'vue'

import { allLine } from '../data'
import { hoverR } from './4moveHover'
import { $, findAllIndex, get屏幕高度 } from '../assets/utils'

watchEffect(() => {
  const v = hoverR.value // vue

  if (!v) return // init vue watch

  const q = allLine.at(-1)!.lineIdx
  const data = allLine
    .filter((line) => findAllIndex(line.words, v))
    .map((line) => (line.lineIdx / q) * get屏幕高度())
    .map(Math.ceil)

  $('#miniMap')!.style.boxShadow = data.map((x) => `red 0px ${x}px 0px 0px`).join(',')
})
