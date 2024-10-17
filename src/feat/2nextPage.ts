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

  // todo 以period
  function nextPage() {
    $$('line')
      .find((e) => e.offsetTop + 50 > 滚动dom.scrollTop + 外壳高度)!
      .scrollIntoView({
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
    return line.offsetTop > 滚动dom.scrollTop && line.offsetTop < 滚动dom.scrollTop + 外壳高度
  })
}
