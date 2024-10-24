// add R

import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

import { allLines } from '../data'
import { findAllIndex } from '../utils/utils'

console.log('.')

type RItemsData = {
  [query: string]: string[]
}
type rItemsDataWordID = {
  [query: string]: string
}

export const rItemsData = useStorage<RItemsData>('rItemsData', {}).value
export const rItemsDataWordID = computed(() => {
  return Object.entries(rItemsData).reduce((acc, [query, wordIDs]) => {
    // wordIDs.forEach((wordID) => {
    //   if (!acc[wordID]) acc[wordID] = []
    //   acc[wordID].push(query)
    //   // 简写
    //   ;(acc[wordID] ||= []).push(query)
    // })
    // wordIDs.forEach((wordID) => {
    //   if (!acc[wordID]) acc[wordID] = ''
    //   acc[wordID] += query
    //   // 简写
    //   acc[wordID] ||= '' += query
    // })

    wordIDs.forEach((wordID) => {
      // acc[wordID] ??= '-'
      // acc[wordID] += query + '-'

      acc[wordID] = (acc[wordID] || '-') + query + '-'
    })

    return acc
  }, {} as rItemsDataWordID)
})

// export const rItemsDataWordID1 = Object.entries(rItemsData).reduce((acc, [query, wordIDs]) => {
//   wordIDs.forEach((wordID) => (acc[wordID] ??= []).push(query))
//   return acc
// }, {} as RItemsData)

// export const rItemsDataWordID2 = Object.entries(rItemsData).reduce((acc, [query, wordIDs]) => {
//   return wordIDs.reduce((acc2, wordID) => {
//     ;(acc2[wordID] ??= []).push(query)
//     return acc2
//   }, acc)
// }, {} as RItemsData)

// export const rItemsDataWordID3 = Object.entries(rItemsData).xx

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
  }

  const tmp: string[] = []
  allLines.forEach(({ words, lineIdx }) => {
    findAllIndex(words, query)?.forEach((wordIdx) => {
      tmp.push(`${lineIdx}-${wordIdx}`)
    })
  })

  rItemsData[query] = tmp

  // 或者 屏幕内显示完毕 添加删除样式
  if (rItemsData[query].length / query.length === 1) {
    console.log('justOne')
    // // wait vue render dom 有fl 不需要再添加样式了
    // setTimeout(() => {
    //   $$(`[${rItemsDataKey}*="${query}"]`).forEach((dom) => {})
    // })
  }
})
