import { allLine, datas, itemRdata, RItems } from '@/data'
import { runWithTime } from '@/debug'
import { upVersion, $$, findAllIndex, deleteItem } from '@/utils'

document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const { nodeName, offsetTop: offsetTopClick } = target

  // 添加删除着色 修改 colorIndex
  if (query) {
    if (!(nodeName === 'LINE')) return

    if (RItems.value.has(query)) {
      RItems.value.delete(query)
      allLine.forEach((line) => {
        const rs = findAllIndex(line.words, query)
        rs.forEach((v) => {
          //   deleteItem(line.colorIndex, v)
        })
      })
    } else {
      RItems.value.add(query)
      allLine.forEach((line) => {
        const rs = findAllIndex(line.words, query)
        if (rs.length) {
          rs.forEach((idx) => {
            if (!itemRdata[line.lineIdx]) {
              itemRdata[line.lineIdx] = {}
            }
            if (!itemRdata[line.lineIdx][idx]) {
              itemRdata[line.lineIdx][idx] = []
            }
            itemRdata[line.lineIdx][idx].push(query)
          })
        }
      })

      console.log(itemRdata)
    }
    return
  }

  console.log(target)

  // 跳转
  const 含有Sections = $$('section').filter((section) => section.textContent!.includes(selection))
  const 第一个Section = 含有Sections[0]
  const 末一个Section = 含有Sections[含有Sections.length - 1]
  const 下一个Section = 含有Sections.find((e) => e.offsetTop > offsetTopClick)
  const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < offsetTopClick)

  const jmp = (() => {
    if (shiftKey && ctrlKey) return 第一个Section
    if (ctrlKey) return 末一个Section
    if (shiftKey) return 上一个Section || 末一个Section
    return 下一个Section || 第一个Section
  })()

  document.documentElement.scrollBy({
    top: jmp.offsetTop - offsetTopClick,
    behavior: 'smooth',
  })
})
