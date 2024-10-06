import { get屏幕内sectionDoms } from '@/utils'

function nextPage() {
  get屏幕内sectionDoms()
    .sort((a, b) => a.offsetTop - b.offsetTop)
    .at(-2)!
    .scrollIntoView({
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
