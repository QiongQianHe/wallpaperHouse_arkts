import { geoLocationManager } from '@kit.LocationKit'
import { BusinessError } from '@kit.BasicServicesKit'

/**
 * 定位服务封装 — 基于 HarmonyOS geoLocationManager
 *
 * 使用步骤：
 *   1. module.json5 中声明 ohos.permission.LOCATION / ohos.permission.APPROXIMATELY_LOCATION
 *   2. 系统首次调用时自动弹出授权弹窗
 *   3. 授权通过后调用 getCurrentLocation() 获取位置
 */

// —— 位置信息返回结构 ——
export class GeoInfo {
  latitude: number = 0
  longitude: number = 0
  altitude: number = 0
  accuracy: number = 0
  cityName: string = ''
  countryName: string = ''
  address: string = ''

  toString(): string {
    if (this.cityName) {
      return this.cityName
    }
    if (this.latitude !== 0 && this.longitude !== 0) {
      return `${this.latitude.toFixed(2)},${this.longitude.toFixed(2)}`
    }
    return '未知位置'
  }
}

/**
 * 检查定位开关是否已开启
 */
export async function isLocationEnabled(): Promise<boolean> {
  try {
    return geoLocationManager.isLocationEnabled()
  } catch (err) {
    console.error('检查定位开关状态失败:', JSON.stringify(err))
    return false
  }
}

/**
 * 一键定位：检测开关 → 若关闭则提示用户手动开启 → 单次定位
 * 这是 sort_bar 直接调用的主入口
 * @param timeoutSeconds 定位超时秒数，默认 10
 */
export async function requestLocation(timeoutSeconds: number = 10): Promise<GeoInfo> {
  // 1. 检测开关
  const enabled = await isLocationEnabled()
  if (!enabled) {
    console.warn('定位开关未开启，请在系统设置中手动开启位置服务')
    throw new Error('定位开关未开启')
  }
  // 2. 定位
  return await getCurrentLocation(timeoutSeconds)
}

/**
 * 获取当前设备位置（单次定位）
 * @param timeoutSeconds 定位超时秒数，默认 10
 */
export async function getCurrentLocation(timeoutSeconds: number = 10): Promise<GeoInfo> {
  const request: geoLocationManager.SingleLocationRequest = {
    locatingPriority: geoLocationManager.LocatingPriority.PRIORITY_LOCATING_SPEED,
    locatingTimeoutMs: timeoutSeconds * 1000
  }

  return new Promise<GeoInfo>((resolve, reject) => {
    try {
      geoLocationManager.getCurrentLocation(request,
        (err: BusinessError, location: geoLocationManager.Location) => {
          if (err) {
            reject(err)
            return
          }
          const info = new GeoInfo()
          info.latitude = location.latitude ?? 0
          info.longitude = location.longitude ?? 0
          info.altitude = location.altitude ?? 0
          info.accuracy = location.accuracy ?? 0
          resolve(info)
        })
    } catch (err) {
      reject(err as BusinessError)
    }
  })
}

/**
 * 逆地理编码 — 根据经纬度反查城市名
 */
export async function reverseGeocode(lat: number, lng: number): Promise<GeoInfo> {
  const info = new GeoInfo()
  info.latitude = lat
  info.longitude = lng

  try {
    const request: geoLocationManager.ReverseGeoCodeRequest = {
      latitude: lat,
      longitude: lng,
      maxItems: 3
    }

    const addresses: Array<geoLocationManager.GeoAddress> =
      await geoLocationManager.getAddressesFromLocation(request)

    if (addresses.length > 0) {
      const top = addresses[0]
      info.cityName = top.locality ?? top.subAdministrativeArea ?? ''
      info.countryName = top.countryName ?? ''
      const parts: string[] = []
      if (top.countryName) {
        parts.push(top.countryName)
      }
      if (top.administrativeArea) {
        parts.push(top.administrativeArea)
      }
      if (top.locality) {
        parts.push(top.locality)
      }
      info.address = parts.join(' ')
    }
  } catch (err) {
    console.error('逆地理编码失败:', JSON.stringify(err))
  }

  return info
}