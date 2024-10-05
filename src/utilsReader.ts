import { datas } from './data'
import { findAllIndex, hoverR, RItems, version, 屏幕内sectionDoms } from './utils'

export function dom2Data(dom: HTMLElement) {
  if (dom.tagName !== 'WORD') {
    return
  }

  const wordIdx = getDomIndex(dom)
  const sectionIdx = getDomIndex(dom.parentElement!)
  const periodIdx = getDomIndex(dom.parentElement!.parentElement!)
  const lineIdx = getDomIndex(dom.parentElement!.parentElement!.parentElement!)
  console.log(lineIdx, periodIdx, sectionIdx, wordIdx)

  return datas[lineIdx][periodIdx][sectionIdx][wordIdx]

  function getDomIndex(dom: HTMLElement) {
    return Array.from(dom.parentElement!.children).findIndex((child) => child === dom)
  }
}

export function colorSection(section: HTMLElement) {
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
}

export function flash() {
  屏幕内sectionDoms.forEach(colorSection)
}
