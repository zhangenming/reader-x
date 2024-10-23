import { 外壳高度, 滚动dom } from '../data'
import { $$ } from '../utils/utils'

console.log('.')

let prevDate = +new Date()
let maxDiff = 0,
  minDiff = Infinity
document.addEventListener('keydown', (e) => {
  // e.preventDefault()

  if (e.code === 'NumpadEnter') {
    if (e.shiftKey) {
      prevPage()
    } else {
      nextPage()
    }
  } else if (e.code === 'NumpadDecimal') {
    prevPage()
  }

  function nextPage() {
    const snap = 滚动dom.scrollTop % 50
    滚动dom.scrollTop += 外壳高度 - snap
    performance.mark('nextPage') // 持续发送频率 18~30ms
    // const diff = +new Date() - prevDate
    // maxDiff = Math.max(maxDiff, diff)
    // minDiff = Math.min(minDiff, diff)
    // prevDate = +new Date()
    // console.log(diff, maxDiff, minDiff)
  }
  function prevPage() {
    const snap = 滚动dom.scrollTop % 50
    滚动dom.scrollTop -= 外壳高度 - snap
  }
})

function get屏幕内LineDoms() {
  return $$('line').filter((line) => {
    return line.offsetTop > 滚动dom.scrollTop && line.offsetTop < 滚动dom.scrollTop + 外壳高度
  })
}
