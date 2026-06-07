// Mock数据源 - 全部使用class定义，遵守ArkTS严格模式

import { CategoryItem, BannerItem, WallpaperItem, CollectionItem, SignResponse } from '../interface/index'

class CategoryItemImpl implements CategoryItem {
  id: string = ''; name: string = ''; icon: string = ''; count: number = 0
}
class BannerItemImpl implements BannerItem {
  id: string = ''; title: string = ''; url: string = ''; desc: string = ''
}
class WallpaperItemImpl implements WallpaperItem {
  id: string = ''; title: string = ''; url_type: number = 0; url: string = ''; is_checked: boolean = false; color: string = ''; type_id: string = ''
}
class CollectionItemImpl implements CollectionItem {
  id: string = ''; wallpaper_type: number = 0; wallpaper_url: string = ''; create_time: string = ''; is_checked: boolean = false; color: string = ''; format_date: string = ''
}
class SignResponseImpl implements SignResponse {
  code: number = 0; data: string = ''; msg: string = ''
}
export class MockUserInfo {
  id: string = ''; avatar: string = ''; uname: string = ''; sex: number = 0; sex_tit: string = ''; nation: string = ''; reg_time: string = ''
}

export function getMockCategories(): CategoryItem[] {
  let list: CategoryItem[] = []
  list.push(make('1','自然风光','🌿',42)); list.push(make('2','城市建筑','🏙️',35))
  list.push(make('3','动物世界','🐾',28)); list.push(make('4','抽象艺术','🎨',31))
  list.push(make('5','简约唯美','✨',50)); list.push(make('6','动漫二次元','🎭',45))
  list.push(make('7','游戏壁纸','🎮',38)); list.push(make('8','宇宙星空','🌌',22))
  return list
}
export function getMockBanners(): BannerItem[] {
  let list: BannerItem[] = []
  list.push(makeB('b1','秋日森林','https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800','静谧的秋日森林'))
  list.push(makeB('b2','城市夜景','https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800','繁华的城市夜景'))
  list.push(makeB('b3','日出海岸','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800','壮丽的海边日出'))
  list.push(makeB('b4','山脉风光','https://images.unsplash.com/photo-1464822759023-fed622ffc2b3?w=800','雄伟的山脉风光'))
  return list
}
export function getMockWallpapers(): WallpaperItem[] {
  let list: WallpaperItem[] = []
  list.push(makeW('w1','秋日小径','https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400','1'))
  list.push(makeW('w2','森林迷雾','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400','1'))
  list.push(makeW('w3','都市霓虹','https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400','2'))
  list.push(makeW('w4','摩天大楼','https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400','2'))
  list.push(makeW('w5','可爱猫咪','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400','3'))
  list.push(makeW('w6','金毛猎犬','https://images.unsplash.com/photo-1552053831-71594a27632d?w=400','3'))
  list.push(makeW('w7','几何之美','https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400','4'))
  list.push(makeW('w8','色彩流动','https://images.unsplash.com/photo-1549490349-8643362247b5?w=400','4'))
  list.push(makeW('w9','极简白','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400','5'))
  list.push(makeW('w10','粉色温柔','https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=400','5'))
  list.push(makeW('w11','二次元少女','https://images.unsplash.com/photo-1578632767115-351597cf1a66?w=400','6'))
  list.push(makeW('w12','星际穿越','https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400','8'))
  return list
}
export function getMockCollections(): CollectionItem[] {
  let list: CollectionItem[] = []
  list.push(makeC('c1','https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400','2025-12-01'))
  list.push(makeC('c2','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400','2025-11-20'))
  list.push(makeC('c3','https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400','2025-11-15'))
  return list
}
export function mockLogin(username: string, password: string): SignResponse {
  let r = new SignResponseImpl()
  if (username.length > 0 && password.length > 0) {
    r.code = 200; r.data = 'mock_jwt_' + Date.now(); r.msg = '登录成功'
  } else {
    r.code = 400; r.msg = '请输入账号密码'
  }
  return r
}
export function getMockUserInfo(): MockUserInfo {
  let u = new MockUserInfo()
  u.id = '1'; u.avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
  u.uname = '未登录'; u.sex = 1; u.sex_tit = ' '; u.nation = ' '; u.reg_time = ' '
  return u
}

function make(id: string, name: string, icon: string, count: number): CategoryItem {
  let c = new CategoryItemImpl(); c.id = id; c.name = name; c.icon = icon; c.count = count; return c
}
function makeB(id: string, title: string, url: string, desc: string): BannerItem {
  let b = new BannerItemImpl(); b.id = id; b.title = title; b.url = url; b.desc = desc; return b
}
function makeW(id: string, title: string, url: string, typeId: string): WallpaperItem {
  let w = new WallpaperItemImpl(); w.id = id; w.title = title; w.url_type = 1; w.url = url; w.is_checked = false; w.type_id = typeId; return w
}
function makeC(id: string, url: string, date: string): CollectionItem {
  let c = new CollectionItemImpl(); c.id = id; c.wallpaper_type = 1; c.wallpaper_url = url; c.create_time = date; c.is_checked = false; c.format_date = date; return c
}

// === 向后兼容：导出函数调用结果（懒加载）====
let _categories: CategoryItem[] | null = null
let _banners: BannerItem[] | null = null
let _wallpapers: WallpaperItem[] | null = null
let _collections: CollectionItem[] | null = null
let _userInfo: MockUserInfo | null = null

export function getCategories(): CategoryItem[] {
  if (_categories === null) _categories = getMockCategories()
  return _categories!
}
export function getBanners(): BannerItem[] {
  if (_banners === null) _banners = getMockBanners()
  return _banners!
}
export function getWallpapers(): WallpaperItem[] {
  if (_wallpapers === null) _wallpapers = getMockWallpapers()
  return _wallpapers!
}
export function getCollections(): CollectionItem[] {
  if (_collections === null) _collections = getMockCollections()
  return _collections!
}
export function getUserInfo(): MockUserInfo {
  if (_userInfo === null) _userInfo = getMockUserInfo()
  return _userInfo!
}

export function login(username: string, password: string): SignResponse {
  return mockLogin(username, password)
}

// 兼容别名 — 供现有导入直接使用
export let mockCategories: CategoryItem[] = []
export let mockBanners: BannerItem[] = []
export let mockWallpapers: WallpaperItem[] = []
export let mockCollections: CollectionItem[] = []
export let mockUserInfo: MockUserInfo = new MockUserInfo()

export function initMockData(): void {
  mockCategories = getMockCategories()
  mockBanners = getMockBanners()
  mockWallpapers = getMockWallpapers()
  mockCollections = getMockCollections()
  mockUserInfo = getMockUserInfo()
}
