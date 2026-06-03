// 类型定义 - 统一导出接口类型

export interface OperateItem {
  icon: string
  title: string
  routeName: string
  params?: object
}

export interface SignForm {
  uname: string
  password: string
}

export interface SignResponse {
  code?: number
  data?: string
  msg?: string
}

export interface PageQuery {
  offset?: number
  limit?: number
  count?: number
}

export interface WallpaperItem {
  id: string
  title: string
  url_type: number
  url: string
  is_checked: boolean
  color?: string
  type_id?: string
}

export interface RouteParams {
  id?: string
  type_id?: string
  title?: string
}

export interface UserInfo {
  id?: string
  avatar: string
  uname: string
  sex?: number
  sex_tit?: string
  nation?: string
  reg_time?: string
}

export interface CollectionItem {
  id: string
  wallpaper_type: number
  wallpaper_url: string
  create_time: string
  is_checked: boolean
  color?: string
  format_date: string
}

export interface CategoryItem {
  id: string
  name: string
  icon: string
  count: number
}

export interface BannerItem {
  id: string
  title: string
  url: string
  desc: string
}
