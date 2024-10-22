// 滚动位置 -> 渲染dom
// 滚动的时候什么也不做 下一页提前渲染好
import { ref } from 'vue'

import { datas, 各个Section的Top, 滚动dom } from '../data'
import { getParams, get屏幕高度, get滚动info } from '../assets/utils'
import { useStorage } from '@vueuse/core'

console.log('.')

export let startSection = 0
let endSection = 0
type x = (typeof datas)[0]
export const renderDatas = ref([] as x[])

let appScroll = useStorage('appScroll', 0)

const 屏幕高度X2 = get屏幕高度()

setTimeout(() => {
  滚动dom.scrollTo({
    top: appScroll.value || 1,
  })
})

滚动dom.onscroll = getParams().static ? () => {} : geneRenderDom

function geneRenderDom() {
  const { 当前滚动位置, 滚动方向 } = get滚动info()

  appScroll.value = 当前滚动位置

  if (滚动方向 === '下') {
    for (let i = startSection + 1; i < datas.length; i++) {
      if (各个Section的Top[i] > 当前滚动位置) {
        startSection = i - 1
        break
      }
    }
  } else {
    for (let i = startSection; i >= 0; i--) {
      if (各个Section的Top[i] <= 当前滚动位置) {
        startSection = i
        break
      }
    }
  }

  const 开始renderTop = 当前滚动位置 - 50
  const 结束renderTop = 当前滚动位置 + 屏幕高度X2

  // 确定了开始 自然就确定了结束 开始位置往后加几个就行
  endSection = startSection
  for (let i = startSection; i < datas.length; i++) {
    if (各个Section的Top[i] > 结束renderTop) {
      break
    }
    endSection++
  }

  const _renderDatas = datas.slice(startSection, endSection) as typeof datas

  renderDatas.value = _renderDatas.map((section) =>
    section
      .map((period, i) => {
        const rs = period.filter((line) => {
          return line.lineTop > 开始renderTop && line.lineTop < 结束renderTop
        })
        return rs
      })
      .filter((period) => period.length)
  )

  // renderDatas.value = [[[renderDatas.value[0][0][0]]]]  //justOne
  // vue(renderDatas,1)
}
