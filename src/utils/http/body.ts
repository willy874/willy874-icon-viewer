import { JsonParse, JsonType } from '../common'

function stringToUint8Array(data: string) {
  const buffer = new Uint8Array(data.length)
  buffer.forEach((_, i) => {
    buffer[i] = data.charCodeAt(i);
  })
  return buffer
}

function isArrayBufferView(data: unknown): data is ArrayBufferView {
  if ([Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float64Array, BigInt64Array, BigUint64Array, DataView].some((type) => data instanceof type)
  ) {
    return true;
  }
  return false;
}


function startControlUint8ArrayStream(body: BodyInit) {
  return (control: ReadableStreamController<Uint8Array>) => {
    // string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams
    let data
    if (body) {
      if (typeof body === 'string') {
        data = stringToUint8Array(body)
      }
      if (isArrayBufferView(body)) {
        if (body instanceof Uint8Array) {
          data = body
        }
        // data = new Uint8Array(body)
      }
      if (body instanceof ArrayBuffer) {
        data = new Uint8Array(body)
      }
      data = new Uint8Array(0)
    }
    control.enqueue(data)
    control.close()
  }
}

export default class IBody implements Body {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;

  constructor(body?: BodyInit | null) {
    if (body instanceof ReadableStream) {
      this.body = body
    } else {
      const data = body
      this.body = data ? new ReadableStream<Uint8Array>({
        start: startControlUint8ArrayStream(data)
      }) : null
    }
    this.bodyUsed = Boolean(this.body)
  }

  async readTextStream(stream: ReadableStream<string>, callback?: (value: string) => void): Promise<string> {
    const reader = stream.getReader();
    let result = '';
    while (true) {
      const { done, value } = await reader.read();
      if (value) {
        result += value
        if (callback) {
          callback(value)
        }
      }
      if (done) break
    }
    return result
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    if (this.body instanceof ReadableStream) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return reader.value
      }
    }
    return new ArrayBuffer(0)
  }

  async blob(): Promise<Blob> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return new Blob([reader.value])
      }
    }
    return new Blob()
  }

  async formData(): Promise<FormData> {
    return new FormData()
  }

  async json(): Promise<JsonType> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return JsonParse(new TextDecoder().decode(reader.value))
      }
    }
    return null
  }

  async text(): Promise<string> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return new TextDecoder().decode(reader.value)
      }
    }
    return ''
  }
}