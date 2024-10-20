import { useStorage } from '@vueuse/core'

import { allLines } from '../data'
import { findAllIndex } from '../assets/utils'

console.log('.')

type RItemsData = {
  [query: string]: string[]
}

export const rItemsData: RItemsData = useStorage('rItemsData', {}).value

document.addEventListener('click', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  if (target.nodeName !== 'LINE') return

  const query = getSelection() + ''
  if (!query) return

  getSelection()!.empty()

  if (rItemsData[query]) {
    delete rItemsData[query]
    return
  } else {
    rItemsData[query] = []
  }

  allLines.forEach(({ words, lineIdx }) => {
    findAllIndex(words, query)?.forEach((wordIdx) => {
      rItemsData[query].push(`${lineIdx}-${wordIdx}`)
    })
  })

  // 或者 屏幕内显示完毕 添加删除样式
  if (rItemsData[query].length / query.length === 1) {
    console.log('justOne')
    // // wait vue render dom 有fl 不需要再添加样式了
    // setTimeout(() => {
    //   $$(`[${rItemsDataKey}*="${query}"]`).forEach((dom) => {})
    // })
  }
})

export function getDomR(dom: HTMLElement) {
  const r = dom.getAttribute('rItemsDataKey')

  return r?.split(',')[0]
}
