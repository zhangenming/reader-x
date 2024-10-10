import { ref } from 'vue'

import { rItemsDataKey } from '../data'

export const hoverR = ref('')

document.addEventListener('mousemove', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  const selection = target.getAttribute(rItemsDataKey)
  if (!selection) return

  const s2 = selection.split(',')[0]

  if (s2 === hoverR.value) return

  console.log('hover', s2)

  hoverR.value = s2
})
