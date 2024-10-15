import { 滚动dom } from '../data'
import { $$, get屏幕高度 } from '../assets/utils'

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

  // todo 以period
  function nextPage() {
    get屏幕内LineDoms().at(-2)!.scrollIntoView({
      block: 'start',
    })
  }
  function prevPage() {
    get屏幕内LineDoms().at(0)!.scrollIntoView({
      block: 'end',
    })
  }
})

function get屏幕内LineDoms() {
  return $$('line').filter((line) => {
    return line.offsetTop > 滚动dom.scrollTop && line.offsetTop < 滚动dom.scrollTop + get屏幕高度()
  })
}
