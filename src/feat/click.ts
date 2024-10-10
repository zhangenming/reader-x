import { rItemsData, allLine } from '../data'
import { $$, findAllIndex, deleteItem } from '../assets/utils'

console.log('click')

document.addEventListener('click', async (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const { nodeName, offsetTop: offsetTopClick } = target

  // selection 添加删除着色 修改 colorIndex
  if (query) {
    if (nodeName !== 'LINE') return

    const rItemsDataAll = Object.values(rItemsData).map(Object.values).flat(2)
    const 已经存在 = rItemsDataAll.includes(query)

    allLine.forEach(({ words, lineIdx }) => {
      findAllIndex(words, query).forEach((wordIdx) => {
        if (已经存在) {
          deleteItem(rItemsData[lineIdx][wordIdx], query)
        } else {
          // if (!rItemsData[lineIdx]) {
          //   rItemsData[lineIdx] = {}
          // }
          // if (!rItemsData[lineIdx][wordIdx]) {
          //   rItemsData[lineIdx][wordIdx] = []
          // }
          // rItemsData[lineIdx][wordIdx].push(query)
          ;((rItemsData[lineIdx] ??= {})[wordIdx] ??= []).push(query)
        }
      })
    })
  } else {
    //
    // click 跳转
    const selection = target.getAttribute('r')
    if (!selection) return
    const s2 = selection.split(',')[0]

    const 含有lines = allLine.filter((line) => line.words.includes(s2))
    const 第一个line = 含有lines[0]
    const 末一个line = 含有lines.at(-1)!
    const 下一个line = 含有lines.find((e) => e.lineIdx * 50 > offsetTopClick)
    const 上一个line = 含有lines.findLast((e) => e.lineIdx * 50 < offsetTopClick)

    const jmpLine = (() => {
      if (shiftKey && ctrlKey) return 第一个line
      if (ctrlKey) return 末一个line
      if (shiftKey) return 上一个line || 末一个line
      return 下一个line || 第一个line
    })()

    document.documentElement.scrollBy({
      top: jmpLine.lineIdx * 50 - offsetTopClick,
      behavior: 'smooth', //todo
    })
  }
})
