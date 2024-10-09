// 滚动位置 -> 渲染dom

import { datas } from '@/data'
import { get屏幕高度, get滚动info } from '@/utils'
import { ref } from 'vue'

export let startSection = ref(0)
export let endSection = ref(0)

const 屏幕高度 = get屏幕高度()

geneRenderDom()
document.onscrollend = geneRenderDom

function geneRenderDom() {
  const { 当前滚动位置, 滚动方向 } = get滚动info()

  if (滚动方向 === '下') {
    for (let i = startSection.value + 1; i < datas.value.length; i++) {
      if (datas.value[i].totalTop > 当前滚动位置) {
        startSection.value = i - 1
        break
      }
    }
  } else {
    for (let i = startSection.value; i >= 0; i--) {
      if (datas.value[i].totalTop <= 当前滚动位置) {
        startSection.value = i
        break
      }
    }
  }

  // 确定了开始 自然就确定了结束 开始位置往后加几个就行
  endSection.value = startSection.value
  for (let i = startSection.value; i < datas.value.length; i++) {
    if (datas.value[i].totalTop > 当前滚动位置 + 屏幕高度) {
      break
    }
    endSection.value++
  }
}
