import { $$ } from '../assets/utils'

console.log('.')

function nextPage() {
  get屏幕内LineDoms().at(-2)!.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
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

export function get屏幕内LineDoms() {
  return $$('line').filter((line) => {
    return (
      line.offsetTop > document.documentElement.scrollTop &&
      line.offsetTop < document.documentElement.scrollTop + innerHeight
    )
  })
}
