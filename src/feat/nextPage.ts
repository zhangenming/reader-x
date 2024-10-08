import { $$ } from '@/utils'

function nextPage() {
  $$('line').at(-2)!.scrollIntoView({
    // behavior: 'smooth',
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

// document.addEventListener('click', nextPage)
