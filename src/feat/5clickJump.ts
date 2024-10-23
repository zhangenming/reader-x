// jump R

import { get滚动info } from '../assets/utils'
import { allLines, 滚动dom } from '../data'
import { getDomR } from './3selectionAddR'

console.log('.')

let 回退位置s: number[] = []

let prevR: string
let prevTop: number
let 点击高度: number

// 鼠标点击跳转
document.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLElement)) return

  const r = getDomR(e.target)
  if (!r) return

  prevR = r
  回退位置s.push(get滚动info().当前滚动位置)
  点击高度 = e.y

  执行跳转(r, e.target.parentElement!.offsetTop, e) // word因为可能缩小 而top不准, 以line为准
})

document.addEventListener('keydown', (e) => {
  // console.log(e.key, e.code)

  // 模拟click跳转
  if (e.key === 'Alt') {
    e.preventDefault()
    if (prevR === undefined) return

    console.log('两种Alt跳转策略', prevTop, document.elementFromPoint(0, 点击高度)!.parentElement!.offsetTop)

    执行跳转(prevR, prevTop, e)
  }

  // 还原click跳转
  if (e.key === 'Backspace') {
    if (回退位置s.length === 0) return

    滚动dom.scrollTo({
      top: 回退位置s.pop(),
      behavior: 'smooth',
    })
  }
})
//
function 执行跳转(r: string, 当前元素top: number, { shiftKey, ctrlKey }: { shiftKey?: boolean; ctrlKey?: boolean } = {}) {
  const 含有lines = allLines.filter((line) => line.words.includes(r))
  const 第一个line = 含有lines[0]
  const 末一个line = 含有lines.at(-1)!
  const 下一个line = 含有lines.find((line) => line.lineTop > 当前元素top)
  const 上一个line = 含有lines.findLast((line) => line.lineTop < 当前元素top)

  const 目标元素top = (() => {
    if (shiftKey && ctrlKey) return 第一个line
    if (ctrlKey) return 末一个line
    if (shiftKey) return 上一个line || 末一个line
    return 下一个line || 第一个line
  })().lineTop

  滚动dom.scrollBy({
    top: 目标元素top - 当前元素top,
    behavior: 'smooth',
  })

  console.log('执行跳转', { r, 当前元素top, shiftKey, ctrlKey, diff: 目标元素top - 当前元素top })

  prevTop = 目标元素top
}
