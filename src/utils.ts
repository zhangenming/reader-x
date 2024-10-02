let version = 0
export const globalData = {
  getVersion() {
    return version
  },
  setVersion(v: number) {
    version = v
  },
  //
  selectionsData: ['福建', '福威镖局'],
  setSelectionsData(data: string[]) {
    globalData.selectionsData = data
  },
}

export function findAllIndex(l: string, r: string) {
  // todo 全局search 然后cache
  if (r == '') {
    console.error('x')
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
