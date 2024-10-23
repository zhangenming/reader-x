// add R

import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

import { allLines } from '../data'
import { findAllIndex } from '../utils/utils'

console.log('.')

type RItemsData = {
  [query: string]: string[]
}

export const rItemsData = useStorage<RItemsData>('rItemsData', {}).value
export const rItemsDataWordID = computed(() => {
  return Object.entries(rItemsData).reduce((acc, [query, wordIDs]) => {
    wordIDs.forEach((wordID) => (acc[wordID] ??= []).push(query))
    return acc
  }, {} as RItemsData)
})

console.log(
  '出现顺序',
  Object.entries(rItemsData)
    .sort((q, w) => Number(q[1][0].split('-')[0]) - Number(w[1][0].split('-')[0]))
    .map((e) => e[0])
)

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
