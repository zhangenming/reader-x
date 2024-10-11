import { allLine } from '../data'
import { getDomR } from './3selectionAddR'

console.log('.')

document.addEventListener('click', ({ target, shiftKey, ctrlKey }) => {
  if (!(target instanceof HTMLElement)) return

  const r = getDomR(target)
  if (!r) return

  const { offsetTop: offsetTopClick } = target
  const 含有lines = allLine.filter((line) => line.words.includes(r))
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
})
