import http from '@ohos.net.http'
import { use_mock, base_url } from './env'
import storage from './storage'

// HTTP请求封装
class HttpRequest {
  private baseUrl: string = use_mock ? '' : base_url

  async getHeaders(): Promise<Record<string, string>> {
    let token: string = await storage.get('token')
    let h: Record<string, string> = {}
    h['Content-Type'] = 'application/json'
    if (token.length > 0) {
      h['Authorization'] = 'Bearer ' + token
    }
    return h
  }

  async get(url: string): Promise<Object> {
    try {
      let h: Record<string, string> = await this.getHeaders()
      let req = http.createHttp()
      let resp = await req.request(this.baseUrl + url, {
        method: http.RequestMethod.GET,
        header: h
      })
      req.destroy()
      return JSON.parse(resp.result as string) as Object
    } catch (err) {
      console.error('GET请求失败:', JSON.stringify(err))
      return new Object()
    }
  }

  async post(url: string, data: Object): Promise<Object> {
    try {
      let h: Record<string, string> = await this.getHeaders()
      let req = http.createHttp()
      let resp = await req.request(this.baseUrl + url, {
        method: http.RequestMethod.POST,
        header: h,
        extraData: data
      })
      req.destroy()
      return JSON.parse(resp.result as string) as Object
    } catch (err) {
      console.error('POST请求失败:', JSON.stringify(err))
      return new Object()
    }
  }
}

const request: HttpRequest = new HttpRequest()
export default request
