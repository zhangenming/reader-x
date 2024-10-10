import { rItemsData, allLine } from '../data'
import { findAllIndex, deleteItem } from '../assets/utils'

console.log('selection')

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
})
