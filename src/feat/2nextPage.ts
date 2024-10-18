import { 外壳高度, 滚动dom } from '../data'
import { $$ } from '../assets/utils'

console.log('.')

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
