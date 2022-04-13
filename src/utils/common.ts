import { AsyncAction, FileName } from 'bam-utility-plugins'
import { JsonType } from './types'

export { AsyncAction, FileName }

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

export function JsonParse(str: string): JsonType {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}