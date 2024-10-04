import { useStorage } from '@vueuse/core'

const selectionsData = useStorage<string[]>('selectionsData', []) // returns Ref<number>

export let version = 0
export function upVersion() {
  version++
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
