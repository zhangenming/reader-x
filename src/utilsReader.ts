import { datas } from './data'

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
