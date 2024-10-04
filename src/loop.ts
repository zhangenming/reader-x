import { runWithTime } from './debug'
import { findAllIndex, globalData, hoverR, RItems, version } from './utils'

const { innerHeight } = window
let old = document.documentElement.scrollTop
function getVisibleSections() {
  // const newScrollTop = document.documentElement.scrollTop
  // if (newScrollTop - old < 100) return []
  // old = newScrollTop

  return globalData.sectionDoms.filter((section) => {
    //   if (!section.ot) section.ot = section.offsetTop

    return (
      section.offsetTop > document.documentElement.scrollTop &&
      section.offsetTop < document.documentElement.scrollTop + innerHeight
    )
  })
}

let visibleSections = getVisibleSections()
// document.onscroll = () => {
//   visibleSections = getVisibleSections()
// }

document.onscrollend = () => {
  visibleSections = getVisibleSections()
}

requestAnimationFrame(function f() {
  requestAnimationFrame(f)

  visibleSections.forEach((section) => {
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
})
