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
        header: h,
        connectTimeout: 10000, // 连接超时10秒
        readTimeout: 10000     // 读取超时10秒
      })
      
      // 检查HTTP状态码
      if (resp.responseCode !== 200) {
        console.error('HTTP错误:', resp.responseCode)
        req.destroy()
        throw new Error('网络请求失败: ' + resp.responseCode)
      }
      
      req.destroy()
      return JSON.parse(resp.result as string) as Object
    } catch (err) {
      console.error('GET请求失败:', JSON.stringify(err))
      throw new Error('网络请求失败') // 抛出Error对象
    }
  }

  async post(url: string, data: Object): Promise<Object> {
    try {
      console.info('POST请求:', this.baseUrl + url)
      console.info('请求数据:', JSON.stringify(data))
      
      let h: Record<string, string> = await this.getHeaders()
      console.info('请求头:', JSON.stringify(h))
      
      let req = http.createHttp()
      let resp = await req.request(this.baseUrl + url, {
        method: http.RequestMethod.POST,
        header: h,
        extraData: data,
        connectTimeout: 10000, // 连接超时10秒
        readTimeout: 10000     // 读取超时10秒
      })
      
      console.info('响应状态码:', resp.responseCode)
      console.info('响应数据:', resp.result)
      
      // 检查HTTP状态码
      if (resp.responseCode !== 200) {
        console.error('HTTP错误:', resp.responseCode)
        req.destroy()
        throw new Error('网络请求失败: ' + resp.responseCode)
      }
      
      req.destroy()
      return JSON.parse(resp.result as string) as Object
    } catch (err) {
      console.error('POST请求失败:', JSON.stringify(err))
      throw new Error('网络请求失败') // 抛出Error对象
    }
  }
}

const request: HttpRequest = new HttpRequest()
export default request
