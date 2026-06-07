import promptAction from '@ohos.promptAction'

// Toast消息提示

function show(message: string, duration: number): void {
  try {
    promptAction.showToast({
      message: message,
      duration: duration
    })
  } catch (err) {
    console.error('Toast显示失败:', JSON.stringify(err))
  }
}

export function toastSuccess(message: string = '操作成功'): void {
  show(message, 2000)
}

export function toastError(message: string = '操作失败，请重试'): void {
  show(message, 2000)
}

export function toastInfo(message: string): void {
  show(message, 1500)
}

// 兼容对象形式调用
export interface ToastObject {
  success: (message?: string) => void
  error: (message?: string) => void
  info: (message: string) => void
}

export const toast: ToastObject = {
  success: toastSuccess,
  error: toastError,
  info: toastInfo
}