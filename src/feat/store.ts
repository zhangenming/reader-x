import localforage from 'localforage'

console.log('.')

export async function local<T>(key: string, defaultVal: () => T, dbg: number = 11): Promise<T> {
  // clear
  if (String(dbg).length % 2) {
    console.log('clear')
    await setLocal(key, null)
  }

  const result = (await getLocal<T>(key)) || defaultVal()
  // setInterval(() => setLocal(key, result), 1000 * 5)
  setLocal(key, result)

  return result
}

async function setLocal(key: string, val: any) {
  // console.log('存储', JSON.stringify(val).length) // 8171360
  // performance.mark('存储')
  await localforage.setItem(key, val)
  // console.log('存储 成功')
  // performance.mark('存储 成功')
}
async function getLocal<T>(key: string) {
  return localforage.getItem<T>(key)
}
