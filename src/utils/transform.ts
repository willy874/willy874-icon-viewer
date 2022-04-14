import { JsonType } from './types'

export function stringToJson<T extends string | null | void>(this: T, param: string): JsonType {
  const data = typeof param !== 'undefined' ? param : this
  try {
    return typeof data === 'string' ? JSON.parse(data) : null
  } catch (error) {
    return null
  }
}

export function jsonToString<T extends object | null | void>(this: T, param: JsonType): string {
  const data = typeof param !== 'undefined' ? param : this
  return JSON.stringify(data)
}

export function bufferToString<T extends Array<number> | ArrayBuffer | ArrayBufferView | null | void>(this: T, param: Array<number> | ArrayBuffer | ArrayBufferView) {
  const data = typeof param !== 'undefined' ? param : this
  if (data instanceof Array) {
    return String.fromCharCode.apply(null, data)
  }
  if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Int16Array) {
    return String.fromCharCode.apply(null, Array.from(data))
  }
  if (data instanceof ArrayBuffer) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(data)))
  }
  console.log(data);

  return ''
}
