import { useStorage } from '@vueuse/core'

import { allLine, txt } from '../data'
import { findAllIndex, deleteItem, $$ } from '../assets/utils'

console.log('.')

type RItemsData = {
  [lineIdx: number]:
    | {
        [wordIdx: number]: string[] | undefined
      }
    | undefined
}

export const rItemsDataKey = 'rItemsDataKey'
export const rItemsData: RItemsData = useStorage('rItemsData', {}).value
export const rItemsFL: RItemsFL = useStorage('rItemsFL', { first: {}, last: {} }).value

type RItemsFL = {
  first: {
    [idx: string]: boolean
  }
  last: {
    [idx: string]: boolean
  }
}

document.addEventListener('click', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  if (target.nodeName !== 'LINE') return

  const query = getSelection() + ''
  if (!query) return

  getSelection()!.empty()

  const 已经存在 = Object.values(rItemsData)
    .map((e) => Object.values(e!))
    .flat(2)
    .includes(query)

  let isFirst = ''
  allLine.forEach(({ words, lineIdx }) => {
    findAllIndex(words, query)?.forEach((wordIdx) => {
      if (已经存在) {
        deleteItem(rItemsData[lineIdx]![wordIdx]!, query)
        // clean obj
        if (rItemsData[lineIdx]![wordIdx]!.length === 0) delete rItemsData[lineIdx]![wordIdx]
        if (Object.keys(rItemsData[lineIdx]!).length === 0) delete rItemsData[lineIdx]
      } else {
        ;((rItemsData[lineIdx] ??= {})[wordIdx] ??= []).push(query)

        const idx = `${lineIdx}-${wordIdx}`
        if (isFirst === '') {
          rItemsFL.first[idx] = true
        }
        isFirst = idx
      }
    })
  })
  rItemsFL.last[isFirst] = true

  // justOne
  const len = txt.split(query).length - 1
  if (len === 1) {
    // wait vue render dom
    setTimeout(() => {
      $$(`[${rItemsDataKey}*="${query}"]`).forEach((dom) => {})
    })
    setTimeout(() => {
      allLine.forEach(({ words, lineIdx }) => {
        findAllIndex(words, query)?.forEach((wordIdx) => {
          deleteItem(rItemsData[lineIdx]![wordIdx]!, query)
        })
      })
    }, 2000)
  }
})

export function getDomR(dom: HTMLElement) {
  const r = dom.getAttribute(rItemsDataKey)

  return r?.split(',')[0]
}
