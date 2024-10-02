import { findAllIndex, globalData } from './utils'

let visibleSections = getVisibleSections()
document.onscroll = () => {
  visibleSections = getVisibleSections()
}

function getVisibleSections() {
  return globalData.sectionDoms.filter((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= window.innerHeight
  })
}

requestAnimationFrame(function f() {
  requestAnimationFrame(f)

  const { version, selectionsData } = globalData

  visibleSections.forEach((section) => {
    if (section.getAttribute('version') === version + '') return
    section.setAttribute('version', version + '')

    // revert old
    const children = section.children as unknown as HTMLElement[]
    ;[...children].forEach((e) => (e.style.cssText = ''))
    // apply new
    selectionsData.forEach((selection) => {
      findAllIndex(section.textContent!, selection).forEach((index) => {
        children[index].style.color = 'red'
        children[index].dataset.selection = selection
      })
    })
  })
})
