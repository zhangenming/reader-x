import { runWithTime } from '@/debug'

export function getLocal<T>(key: string, defaultVal: () => T): T {
  const rs = JSON.parse(localStorage.getItem(key)!) || defaultVal()

  window.addEventListener('unload', () => {
    setLocal(key, rs) // 只能自动存储可变修改
  })

  return rs
}

function setLocal(key: string, val: any) {
  return localStorage.setItem(key, JSON.stringify(val))
}
