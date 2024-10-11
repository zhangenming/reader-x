import { computed, watchEffect } from 'vue'

import { allLine } from '../data'
import { hoverR } from './4moveHover'
import { findAllIndex } from '../assets/utils'

watchEffect(() => {
  const v = hoverR.value // vue

  if (!v) return

  const q = allLine.at(-1)!.lineIdx
  const data = allLine
    .filter((line) => findAllIndex(line.words, v))
    .map((line) => (line.lineIdx / q) * 100)

  document.querySelector<HTMLElement>('#miniMap')!.style.boxShadow = data
    .map((x) => `red 0px ${x}vh 0px 0px`)
    .join(',')

  console.log(data)
})
