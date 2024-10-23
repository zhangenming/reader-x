console.log('.')

export function findAllIndex(l: string, r: string) {
  if (r == '') {
    console.error('x')
    return
  }
  if (!l.includes(r)) {
    return
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

export function $(selector: string) {
  return document.querySelector<HTMLElement>(selector)!
}
export function $$<T extends HTMLElement>(selector: string) {
  return Array.from(document.querySelectorAll<T>(selector))
}

export function get屏幕高度() {
  return window.innerHeight
}

export function get屏幕宽度() {
  return window.innerWidth
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

export function getRandomElement<T>(arr: T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
