import { 屏幕内sectionsDoms } from '@/utils'

function nextPage() {
  屏幕内sectionsDoms.at(-1)!.scrollIntoView({
    behavior: 'smooth',
  })
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    nextPage()
  }
})

// document.addEventListener('click', nextPage)
