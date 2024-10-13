import { 滚动dom } from '../data'
import { $$, get屏幕高度 } from '../assets/utils'

console.log('.')

function nextPage() {
  get屏幕内LineDoms().at(-2)!.scrollIntoView({
    block: 'start',
    // behavior: 'smooth',
  })
}
function prevPage() {
  $$('line').at(-20)!.scrollIntoView({
    // behavior: 'smooth',
    block: 'end',
  })
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()

    if (e.shiftKey) {
      prevPage()
    } else {
      nextPage()
    }
  }
})

function get屏幕内LineDoms() {
  return $$('line').filter((line) => {
    return line.offsetTop > 滚动dom.scrollTop && line.offsetTop < 滚动dom.scrollTop + get屏幕高度()
  })
}
