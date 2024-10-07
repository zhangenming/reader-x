// 滚动位置 -> 渲染dom

import { datas, tops } from '@/data'
import { ref } from 'vue'

export let start = ref(0)
export let end = ref(0)

let oldScrollTop = 0
let oldStart = 0
let oldEnd = 0

const { innerHeight } = window

document.onscroll = () => {
  const { scrollTop } = document.documentElement

  let times = 0
  if (scrollTop > oldScrollTop) {
    for (let i = start.value + 1; i < tops.length; i++) {
      times++
      if (tops[i] > scrollTop) {
        start.value = i - 1
        break
      }
    }
  } else {
    for (let i = start.value; i >= 0; i--) {
      times++
      if (tops[i] < scrollTop) {
        start.value = i
        break
      }
    }
  }

  for (let i = start.value; i < tops.length; i++) {
    if (tops[i] > scrollTop + innerHeight) {
      end.value = i
      break
    }
  }

  //   console.log(start.value - oldStart, end.value - oldEnd)
  if (end.value - oldEnd === 1) {
    const addLen =
      datas[end.value - 1].flat(0).length +
      datas[end.value - 1].flat(1).length +
      datas[end.value - 1].flat(2).length
    console.log(addLen)
    performance.mark(addLen + '')
  }

  oldStart = start.value
  oldEnd = end.value

  //   console.log(scrollTop - old > 0 ? 'down' : 'up', times)
  oldScrollTop = scrollTop
}
