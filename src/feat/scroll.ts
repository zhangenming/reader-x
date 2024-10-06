// 滚动位置 -> 渲染dom

import { datas, tops } from '@/data'
import { ref } from 'vue'

export let start = ref(0)
export let end = ref(0)

let old = 0

const { innerHeight } = window

document.onscroll = () => {
  const { scrollTop } = document.documentElement

  let times = 0
  if (scrollTop > old) {
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

  //   console.log(scrollTop - old > 0 ? 'down' : 'up', times)
  old = scrollTop
}
