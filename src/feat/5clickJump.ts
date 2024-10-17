import { get滚动info } from '../assets/utils'
import { allLines, 滚动dom } from '../data'
import { getDomR } from './3selectionAddR'

console.log('.')

let prevScrollTop: number

let prevR: string
let prevTop: number

// 鼠标点击跳转
document.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLElement)) return

  const r = getDomR(e.target)
  if (!r) return

  prevScrollTop = get滚动info().当前滚动位置

  执行跳转(r, e.target.parentElement!.offsetTop, e) // word因为可能缩小 而top不准, 以line为准
})

document.addEventListener('keydown', (e) => {
  if (prevScrollTop === undefined) return

  // 键盘连续跳转
  // if (e.key === 'Shift') {
  //   e.preventDefault()
  //   执行跳转(prevR, prevTop, { shiftKey: true })
  // }
  // if (e.key === 'Control') {
  //   e.preventDefault()
  //   执行跳转(prevR, prevTop)
  // }
  if (e.key === 'Alt') {
    e.preventDefault()
    执行跳转(prevR, prevTop, e)
  }

  // 还原
  if (e.key === 'Backspace') {
    滚动dom.scrollTo({
      top: prevScrollTop,
      behavior: 'smooth',
    })
  }
})

//
function 执行跳转(r: string, 当前top: number, { shiftKey, ctrlKey }: { shiftKey?: boolean; ctrlKey?: boolean } = {}) {
  const 含有lines = allLines.filter((line) => line.words.includes(r))
  const 第一个line = 含有lines[0]
  const 末一个line = 含有lines.at(-1)!
  const 下一个line = 含有lines.find((line) => line.top > 当前top)
  const 上一个line = 含有lines.findLast((line) => line.top < 当前top)

  const 目标top = (() => {
    if (shiftKey && ctrlKey) return 第一个line
    if (ctrlKey) return 末一个line
    if (shiftKey) return 上一个line || 末一个line
    return 下一个line || 第一个line
  })().top

  滚动dom.scrollBy({
    top: 目标top - 当前top,
    behavior: 'smooth',
  })

  prevR = r
  prevTop = 目标top
}
