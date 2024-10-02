import { findAllIndex, globalData } from './utils'
;(window as any).version = 0

// await sections dom
setTimeout(() => {
  const sections = document.querySelectorAll('section')

  let visibleSections: HTMLElement[] = []
  document.onscroll = () => {
    visibleSections = Array.from(sections).filter((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top >= 0 && rect.bottom <= window.innerHeight
    })
  }

  requestAnimationFrame(function f() {
    requestAnimationFrame(f)

    const { getVersion, selectionsData } = globalData
    const version = getVersion()

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
        })
      })
    })
  })
})
