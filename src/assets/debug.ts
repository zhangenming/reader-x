console.log('.')

export async function sleep(ms: number, key?: string) {
  console.time(key)
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(0)
      console.timeEnd(key)
    }, ms)
  )
}

export async function runWithTimeSync<T>(key: string, fn: () => T): Promise<Awaited<T>> {
  console.time(key)

  const rs = await fn()

  console.timeEnd(key)

  return rs
}

// 同步测试 使用异步版本测量会不准确
export function runWithTime<T>(fn: () => T, key = 'runWithTime') {
  console.time(key)

  const rs = fn()

  console.timeEnd(key)

  return rs
}

export function 意外(f: boolean) {
  if (f) {
    console.error('意外')
  }
  return f
}
