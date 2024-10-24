import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

import { datas, 各个Section的Top, 滚动dom } from '../data'
import { getParams, get屏幕高度 } from '../utils/utils'
import { get滚动info } from '../utils/utilsX'

console.log('.')

export let startSection = 0
let endSection = 0
type x = (typeof datas)[0]
export const renderDatas = ref([] as x[])

let appScroll = useStorage('appScroll', 0)

const event = getParams().home ? 'onscroll' : 'onscrollend'

// 滚动位置 -> 渲染dom
// 滚动的时候什么也不做 下一页提前渲染好
const overScan = 0
const 渲染高度 = get屏幕高度() + (event === 'onscrollend' ? overScan : 0)

setTimeout(() => {
  滚动dom.scrollTo({
    top: appScroll.value || 1,
  })
})

滚动dom[event] = getParams().static ? () => {} : filterDataForRender

let prevData = [] as x[0]
function filterDataForRender() {
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
  const 结束renderTop = 当前滚动位置 + 渲染高度

  // 确定了开始 自然就确定了结束 开始位置往后加几个就行
  endSection = startSection
  for (let i = startSection; i < datas.length; i++) {
    if (各个Section的Top[i] > 结束renderTop) {
      break
    }
    endSection++
  }

  renderDatas.value = datas.slice(startSection, endSection).map((section) =>
    section
      .map((period, i) => {
        const rs = period.filter((line) => {
          return line.lineTop > 开始renderTop && line.lineTop < 结束renderTop
        })
        return rs
      })
      .filter((period) => period.length)
  )

  const curData = renderDatas.value.flat(2)

  console.log({
    add: curData.filter((e) => !prevData.map((ee) => ee.lineIdx).includes(e.lineIdx)).map((e) => e.words),
    del: prevData.filter((e) => !curData.map((ee) => ee.lineIdx).includes(e.lineIdx)).map((e) => e.words),
  })

  prevData = curData
  // renderDatas.value = [[[renderDatas.value[0][0][0]]]]  //justOne
  // vue(renderDatas,1)
}
