// hover R

import { ref } from 'vue'
import { getDomR } from '../utils/utilsX'
import { rItemsData } from './3selectionAddR'

console.log('.')

export const hoverR = ref('')

let prevTarget: HTMLElement
document.addEventListener('mousemove', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  if (prevTarget === target) return

  const r = getDomR(target)
  if (!r) return

  showIdxInfo(r, target)

  // console.log(`hoverChange: ${hoverR.value} -> ${r}`)

  hoverR.value = r

  prevTarget = target
})

let prevRs = ''
function showIdxInfo(r: string, target: HTMLElement) {
  const curIdx = rItemsData[r].findIndex((e) => e.split('-')[0] === target.parentElement!.getAttribute('i')) / r.length + 1
  const allIdx = rItemsData[r].length / r.length
  const curRs = `${curIdx}/${allIdx} (${((curIdx / allIdx) * 100).toFixed(2)}%)`
  if (curRs === prevRs) return

  console.log(curRs) // todo tooltip
  prevRs = curRs
}
