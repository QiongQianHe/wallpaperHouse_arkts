import window from '@ohos.window'
import connection from '@ohos.net.connection'

// 通用工具函数 - 模块化导出

// 获取屏幕高度
export async function getScreenHeight(context: Context): Promise<number> {
  try {
    const win = await window.getLastWindow(context)
    const rect = win.getWindowProperties().windowRect
    return rect.height
  } catch (err) {
    console.error('获取屏幕高度失败:', JSON.stringify(err))
    return 0
  }
}

// 获取随机背景色
export function getRandomColor(): string {
  const colors: string[] = ['#FFE4E1', '#E6E6FA', '#F0FFF0', '#FFF0F5', '#F5F5DC', '#E0FFFF', '#FAEBD7']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 给列表项随机背景色 - 保留用于兼容（已不再使用）
export function setBgColor(list: Object[]): Object[] {
  const result: Object[] = []
  for (let i = 0; i < list.length; i++) {
    const item: Record<string, Object> = {} as Record<string, Object>
    const keys = Object.keys(list[i])
    for (let j = 0; j < keys.length; j++) {
      item[keys[j]] = (list[i] as Record<string, Object>)[keys[j]]
    }
    item['color'] = getRandomColor()
    result.push(item)
  }
  return result
}

// 触摸事件背景色
export function touchBgColor(event: TouchEvent): string {
  return event.type === TouchType.Down ? '#f5f5f5' : '#ffffff'
}

// 检测网络状态
export async function connectNet(): Promise<number> {
  try {
    const netHandle = await connection.getDefaultNet()
    const netCap = await connection.getNetCapabilities(netHandle)
    return netCap.bearerTypes.length > 0 ? 1 : -1
  } catch (e) {
    return -1
  }
}

// 格式化日期
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 截断字符串
export function truncateText(text: string, maxLen: number): string {
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text
}
