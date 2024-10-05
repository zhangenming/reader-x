import { useStorage } from '@vueuse/core'
import { colorSection, flash } from './utilsReader'

const selectionsData = useStorage<string[]>('selectionsData', []) // returns Ref<number>

export let version = 0
export function upVersion() {
  version++
  flash()
}

export function setupSectionScroll(doms: HTMLElement[]) {
  const o = new IntersectionObserver((doms) => {
    doms.forEach((e) => {
      if (e.isIntersecting) {
        屏幕内sectionDoms.push(e.target as HTMLElement)
        colorSection(e.target as HTMLElement)
      } else {
        deleteItem(屏幕内sectionDoms, e.target as HTMLElement)
      }
    })
  })
  doms.forEach((dom) => {
    o.observe(dom)
  })
}

export let 屏幕内sectionDoms: HTMLElement[] = []

export const RItems = useStorage('RItems', new Set<string>([]))

export let hoverR = ''
export function setHoverR(r: string) {
  if (!r) return
  if (r === hoverR) return

  hoverR = r
  upVersion()
}

export const globalData = {
  get selectionsData() {
    return selectionsData.value
  },
  setSelectionsData(data: string[]) {
    selectionsData.value = data
  },

  //
  sectionDoms: [] as HTMLElement[],
}

export function findAllIndex(l: string, r: string) {
  if (r == '') {
    console.error('x')
    return []
  }
  if (!l.includes(r)) {
    return []
  }

  const rs = []
  let pos = 0
  while (1) {
    const p = l.indexOf(r, pos)
    if (p === -1) break

    rs.push(p)
    pos = p + r.length
  }

  const rsAll = []
  for (let i = 0; i < rs.length; i++) {
    for (let j = 0; j < r.length; j++) {
      rsAll.push(rs[i] + j)
    }
  }

  return rsAll
}

export function deleteItem(arr: any[], item: any) {
  const idx = arr.indexOf(item)
  if (idx === -1) return
  arr.splice(idx, 1)
}

export const $$ = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s))
