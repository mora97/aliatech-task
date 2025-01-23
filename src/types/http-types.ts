type RequestOriginInfo = {
  storeName: String
  storeMethod: String
  payload: any
}

export type HttpConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: any
  params?: any,
  originInfo?: RequestOriginInfo
}
