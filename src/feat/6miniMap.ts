import { watchEffect } from 'vue'

import { hoverR } from './4moveHover'
import { $ } from '../assets/utils'
import { rItemsData } from './3selectionAddR'

watchEffect(() => {
  const v = hoverR.value // vue 监控hoverR值变化事件

  if (!v) return // init vue watch

  $('#miniMap')!.style.boxShadow = rItemsData[v]?.miniMap.join(',') || ''
})
