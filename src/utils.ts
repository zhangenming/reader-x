import { useStorage } from '@vueuse/core'
import { flash } from './loop'

const selectionsData = useStorage<string[]>('selectionsData', []) // returns Ref<number>

export let version = 0
export function upVersion() {
  version++
  flash()
}

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
  return arr.splice(arr.indexOf(item), 1)
}

export const $$ = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s))
