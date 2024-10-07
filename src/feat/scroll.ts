// 滚动位置 -> 渲染dom

import { datas } from '@/data'
import { ref } from 'vue'

export let startSection = ref(0)
export let endSection = ref(0)
export let startLine = ref(0)
export let endLine = ref(0)

export let appScrollTop = ref(0)

let oldScrollTop = 0
let oldStart = 0
let oldEnd = 0

const { innerHeight } = window

document.onscroll = () => {
  const { scrollTop } = document.documentElement

  appScrollTop.value = scrollTop

  startLine.value = scrollTop / 50
  endLine.value = (scrollTop + innerHeight) / 50

  let times = 0
  if (scrollTop > oldScrollTop) {
    for (let i = startSection.value + 1; i < datas.length; i++) {
      times++
      if (datas[i].totalTop > scrollTop) {
        startSection.value = i - 1
        break
      }
    }
  } else {
    for (let i = startSection.value; i >= 0; i--) {
      times++
      if (datas[i].totalTop < scrollTop) {
        startSection.value = i
        break
      }
    }
  }

  for (let i = startSection.value; i < datas.length; i++) {
    if (datas[i].totalTop > scrollTop + innerHeight) {
      endSection.value = i
      break
    }
  }

  //   console.log(start.value - oldStart, end.value - oldEnd)
  if (endSection.value - oldEnd === 1) {
    const addLen =
      datas[endSection.value - 1].flat(0).length +
      datas[endSection.value - 1].flat(1).length +
      datas[endSection.value - 1].flat(2).length
    console.log(addLen)
    performance.mark(addLen + '')
  }

  oldStart = startSection.value
  oldEnd = endSection.value

  //   console.log(scrollTop - old > 0 ? 'down' : 'up', times)
  oldScrollTop = scrollTop
}
