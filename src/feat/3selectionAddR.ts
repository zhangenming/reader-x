import { useStorage } from '@vueuse/core'

import { allLine, txt } from '../data'
import { findAllIndex, deleteItem, $$, get屏幕高度 } from '../assets/utils'

console.log('.')

type RItemsData = {
  [selection: string]: {
    wordIdx: string[]
    first: string
    last: string
    miniMap: any
  }
}

export const rItemsDataKey = 'rItemsDataKey'
export const rItemsData: RItemsData = useStorage('rItemsData', {}).value

document.addEventListener('click', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  if (target.nodeName !== 'LINE') return

  const query = getSelection() + ''
  if (!query) return

  getSelection()!.empty()

  if (rItemsData[query]) {
    return delete rItemsData[query]
  } else {
    rItemsData[query] = {
      wordIdx: [],
      first: '',
      last: '',
      miniMap: new Set(),
    }
  }

  const data = rItemsData[query]

  allLine.forEach(({ words, lineIdx }) => {
    findAllIndex(words, query)?.forEach((wordIdx) => {
      const idx = `${lineIdx}-${wordIdx}`

      data.wordIdx.push(idx)

      if (!data.first) {
        data.first = idx
      }
      data.last = idx
      data.miniMap.add(lineIdx)
    })
  })

  const q = allLine.at(-1)!.lineIdx

  data.miniMap = [...data.miniMap]
    .map((lineIdx) => (lineIdx / q) * get屏幕高度())
    .map((e) => Math.max(1, Math.floor(e))) //向下取整 但不小于1
    .map((x) => `red 0px ${x}px 0px 0px`)

  if (data.miniMap.length === 1) {
    console.log('justOne')
    // // wait vue render dom 有fl 不需要再添加样式了
    // setTimeout(() => {
    //   $$(`[${rItemsDataKey}*="${query}"]`).forEach((dom) => {})
    // })
    setTimeout(() => {
      delete rItemsData[query]
    }, 2000)
  }
})

export function getDomR(dom: HTMLElement) {
  const r = dom.getAttribute(rItemsDataKey)

  return r?.split(',')[0]
}
