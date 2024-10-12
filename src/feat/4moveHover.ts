import { ref } from 'vue'

import { getDomR } from './3selectionAddR'

console.log('.')

export const hoverR = ref('')

document.addEventListener('mousemove', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  const r = getDomR(target)
  if (!r) return

  if (r === hoverR.value) return

  console.log(`hover: ${hoverR.value} -> ${r}`)

  hoverR.value = r
})
