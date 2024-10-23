import { 滚动dom } from '../data'
import { getRandomElement } from './utils'

export function getDomR(dom: HTMLElement) {
  const rs = dom.getAttribute('rItemsDataKey')?.split(',')
  if (!rs) return

  return getRandomElement(rs)
}

let _上次滚动位置 = 0
export function get滚动info() {
  const 当前滚动位置 = 滚动dom.scrollTop
  const 滚动方向 = 当前滚动位置 > _上次滚动位置 ? '下' : '上'
  _上次滚动位置 = 当前滚动位置

  return { 当前滚动位置, 滚动方向 }
}
