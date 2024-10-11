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

  allLine.forEach(({ words, lineIdx }) => {
    findAllIndex(words, query).forEach((wordIdx) => {
      if (已经存在) {
        deleteItem(rItemsData[lineIdx]![wordIdx]!, query)
      } else {
        ;((rItemsData[lineIdx] ??= {})[wordIdx] ??= []).push(query)
      }
    })
  })

  // justOne
  const len = txt.split(query).length - 1
  if (len === 1) {
    // wait vue render dom
    setTimeout(() => {
      $$(`[${rItemsDataKey}*="${query}"]`).forEach((dom) => {})
    })
    setTimeout(() => {
      allLine.forEach(({ words, lineIdx }) => {
        findAllIndex(words, query).forEach((wordIdx) => {
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
