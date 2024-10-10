console.log('utils')

export function get屏幕内sectionDoms() {
  return $$('line').filter((line) => {
    return (
      line.offsetTop > document.documentElement.scrollTop &&
      line.offsetTop < document.documentElement.scrollTop + innerHeight
    )
  })
}

export function findAllIndex(l: string, r: string) {
  if (r == '') {
    console.error('x')
    return []
  }
  if (!l.includes(r)) {
    return []
  }

  const rs = []
  let pos = 0
  while (1) {
    const p = l.indexOf(r, pos)
    if (p === -1) break

    rs.push(p)
    pos = p + r.length
  }

  const rsAll = []
  for (let i = 0; i < rs.length; i++) {
    for (let j = 0; j < r.length; j++) {
      rsAll.push(rs[i] + j)
    }
  }

  return rsAll
}

export function deleteItem<T>(arr: T[], item: T) {
  const idx = arr.indexOf(item)
  if (idx === -1) return
  arr.splice(idx, 1)
}

export const $$ = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s))

let _上次滚动位置 = 0
export function get滚动info() {
  const 当前滚动位置 = document.documentElement.scrollTop
  const 滚动方向 = 当前滚动位置 > _上次滚动位置 ? '下' : '上'
  _上次滚动位置 = 当前滚动位置

  return { 当前滚动位置, 滚动方向 }
}

export function get屏幕高度() {
  return window.innerHeight
}

export function getParams() {
  const urlParams = new URLSearchParams(location.search)
  return new Proxy(urlParams, {
    get(urlParams, arg) {
      const rs = urlParams.get(arg as string)
      if (rs === null) return false
      if (rs === '') return true
      return rs
    },
  }) as unknown as { [s: string]: string | boolean }
}
