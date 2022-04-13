import { isApp, isArrayEmpty, isBlobEmpty, isClass, isDarkMode, isEmpty, isNumberEmpty, isObjectEmpty, isStringEmpty, isTextExcludes, isTextIncludes } from 'bam-utility-plugins'

export {
  isApp, isArrayEmpty, isBlobEmpty, isClass, isDarkMode, isEmpty, isNumberEmpty, isObjectEmpty, isStringEmpty, isTextExcludes, isTextIncludes
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isArrayBufferView(data: unknown): data is ArrayBufferView {
  if ([Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float64Array, BigInt64Array, BigUint64Array, DataView].some((type) => data instanceof type)
  ) {
    return true;
  }
  return false;
}

export function isHeaders(data: unknown): data is Headers {
  return typeof Headers !== 'undefined' && data instanceof Headers
}

export function isRequest(data: unknown): data is Request {
  return typeof Request !== 'undefined' && data instanceof Request
}

export function isResponse(data: unknown): data is Response {
  return typeof Response !== 'undefined' && data instanceof Response
}