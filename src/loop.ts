import { runWithTime } from './debug'
import { findAllIndex, globalData, hoverR, RItems, version } from './utils'

const { innerHeight } = window

export function flash() {
  Array.from(document.querySelectorAll('section'))
    .filter((section) => {
      return (
        section.offsetTop > document.documentElement.scrollTop &&
        section.offsetTop < document.documentElement.scrollTop + innerHeight
      )
    })
    .forEach((section) => {
      if (section.getAttribute('version') === version + '') return
      section.setAttribute('version', version + '')

      // revert old
      const children = section.children as unknown as HTMLElement[]
      ;[...children].forEach((e) => (e.style.cssText = ''))
      // apply new
      RItems.value.forEach((selection) => {
        findAllIndex(section.textContent!, selection).forEach((index) => {
          children[index].style.color = 'red'
          children[index].dataset.selection = selection
        })
      })

      hoverR &&
        findAllIndex(section.textContent!, hoverR).forEach((index) => {
          children[index].style.backgroundColor = 'black'
          children[index].style.color = 'white'
        })
    })
}
document.onscrollend = flash
