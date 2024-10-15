// 滚动位置 -> 渲染dom
// 滚动的时候什么也不做 下一页提前渲染好
import { ref } from 'vue'

import { datas, 前面有几个margin, 每个section前面有几个line, 滚动dom } from '../data'
import { getParams, get屏幕高度, get滚动info } from '../assets/utils'
import { useStorage } from '@vueuse/core'

console.log('.')

export const startSection = ref(0)
export const endSection = ref(0)

let appPrevScroll = useStorage('appPrevScroll', 0)

const 屏幕高度 = get屏幕高度() * 2

setTimeout(() => {
  滚动dom.scrollTo(0, appPrevScroll.value)
})

滚动dom.onscrollend = getParams().static ? () => {} : geneRenderDom

function geneRenderDom() {
  const { 当前滚动位置, 滚动方向 } = get滚动info()

  appPrevScroll.value = 当前滚动位置

  if (滚动方向 === '下') {
    for (let i = startSection.value + 1; i < datas.length; i++) {
      if (每个section前面有几个line[i] + 前面有几个margin[i - 1] > 当前滚动位置) {
        startSection.value = i - 1
        break
      }
    }
  } else {
    for (let i = startSection.value; i >= 0; i--) {
      if (每个section前面有几个line[i] + 前面有几个margin[i - 1] <= 当前滚动位置) {
        startSection.value = i
        break
      }
    }
  }

  // 确定了开始 自然就确定了结束 开始位置往后加几个就行
  endSection.value = startSection.value
  for (let i = startSection.value; i < datas.length; i++) {
    if (每个section前面有几个line[i] + 前面有几个margin[i - 1] > 当前滚动位置 + 屏幕高度) {
      break
    }
    endSection.value++
  }
}
