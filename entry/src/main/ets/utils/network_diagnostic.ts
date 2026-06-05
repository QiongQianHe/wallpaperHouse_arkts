// 网络诊断工具

import http from '@ohos.net.http'
import { base_url } from './env'

export class NetworkDiagnostic {
  /**
   * 测试后端服务器连通性
   */
  static async testConnection(): Promise<void> {
    console.info('=== 开始网络诊断 ===')
    console.info('后端地址:', base_url)
    
    try {
      // 测试1: 简单的GET请求
      console.info('\n[测试1] 尝试连接后端服务器...')
      const req = http.createHttp()
      const resp = await req.request(base_url, {
        method: http.RequestMethod.GET,
        connectTimeout: 5000,
        readTimeout: 5000
      })
      
      console.info('✓ 连接成功')
      console.info('  状态码:', resp.responseCode)
      req.destroy()
    } catch (err) {
      console.error('✗ 连接失败')
      console.error('  错误信息:', JSON.stringify(err))
    }
    
    try {
      // 测试2: 测试登录接口
      console.info('\n[测试2] 测试登录接口...')
      const req = http.createHttp()
      const resp = await req.request(base_url + '/api/sign/reg_login', {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'application/json'
        },
        extraData: {
          uname: 'test',
          password: 'test123'
        },
        connectTimeout: 5000,
        readTimeout: 5000
      })
      
      console.info('✓ 接口调用成功')
      console.info('  状态码:', resp.responseCode)
      console.info('  响应数据:', resp.result)
      req.destroy()
    } catch (err) {
      console.error('✗ 接口调用失败')
      console.error('  错误信息:', JSON.stringify(err))
    }
    
    console.info('\n=== 诊断完成 ===')
  }
  
  /**
   * 检查网络配置
   */
  static checkConfig(): void {
    console.info('=== 网络配置检查 ===')
    console.info('后端地址:', base_url)
    console.info('协议类型:', base_url.startsWith('https') ? 'HTTPS' : 'HTTP')
    
    // 检查IP地址格式
    const ipMatch = base_url.match(/:\/\/([0-9.]+):/)
    if (ipMatch) {
      const ip = ipMatch[1]
      console.info('服务器IP:', ip)
      
      // 检查是否是本地IP
      if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
        console.info('✓ 使用局域网IP')
        console.info('  提示: 确保手机和电脑在同一WiFi网络')
      } else if (ip === '127.0.0.1' || ip === 'localhost') {
        console.info('✗ 使用本地回环地址')
        console.info('  警告: 模拟器可以使用，真机无法访问')
      } else {
        console.info('✓ 使用公网IP或域名')
      }
    }
    
    console.info('=====================')
  }
}
