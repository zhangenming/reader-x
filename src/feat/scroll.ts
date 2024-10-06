// 滚动位置 -> 渲染dom

import { datas, tops } from '@/data'

let old: number
document.onscrollend = () => {
  console.log('scrollend', document.documentElement.scrollTop)

  if (!old) {
  }
}
