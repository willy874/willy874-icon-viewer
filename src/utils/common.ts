type AsyncFunction = (...args: unknown[]) => Promise<unknown>

export function AsyncAction(funcs: AsyncFunction[], initData?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    (async function () {
      let data = initData
      for (let index = 0; index < funcs.length; index++) {
        const func = funcs[index];
        if (typeof func === 'function') {
          try {
            data = await func(data)
          } catch (error) {
            reject(error)
          }
        }
      }
      resolve(data)
    })()
  })
}

interface AdapterOptions<B = unknown, N = unknown, D = unknown> {
  browser?: () => B;
  node?: () => N;
  default?: () => D;
}

export function getDefaultAdapter<B, N, D>(options: AdapterOptions<B, N, D>): B | N | D | null {
  const { browser, node } = options
  if (browser && typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    return browser()
  } else if (node && typeof window !== 'undefined' && Object.prototype.toString.call(process) === '[object Window]') {
    return node()
  }
  return options.default ? options.default() : null
}
