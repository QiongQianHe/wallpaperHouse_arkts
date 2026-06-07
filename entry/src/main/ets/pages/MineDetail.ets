import { mockWallpapers, mockCollections, mockUserInfo } from '../utils/data_source'
import { WallpaperItem, CollectionItem, UserInfoData } from '../interface/index'
import { getRandomColor } from '../utils/tools'
import { Loading } from '../component/Loading'
import request from '../utils/http'
import { API } from '../utils/api_config'
import storage from '../utils/storage'
import { MyWallpaper } from './tab/MyWallpaper'
import { MyCollection } from './tab/MyCollection'
import { UserProfile } from './tab/UserProfile'
import { AboutPage } from './tab/AboutPage'

// 我的详情页 - NavDestination
@Builder
export function MineDetailDestination(param?: object) {
  MineDetailDestinationComponent({ param: param })
}

@Component
struct MineDetailDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  param?: object
  @State currentTab: number = 0
  @State title: string = '我的壁纸'
  @State wallpapers: WallpaperItem[] = []
  @State collections: CollectionItem[] = []
  @State userInfo: UserInfoData = new UserInfoData()
  @State loading: boolean = false
  @StorageLink('uname') uname: string = mockUserInfo.uname
  tabTitles: string[] = ['我的壁纸', '我的收藏', '个人信息', '关于']

  aboutToAppear(): void {
    // 从导航参数中读取 tabIndex，切换到对应 Tab
    if (this.param) {
      const paramObj = this.param as Record<string, number>
      if (paramObj.tabIndex !== undefined) {
        this.currentTab = paramObj.tabIndex
        this.title = this.tabTitles[paramObj.tabIndex]
      }
    }

    // 初始化用户数据 — 先用 AppStorage 的 uname 做占位
    let ui = new UserInfoData()
    ui.uname = this.uname
    this.userInfo = ui

    this.loadData()
  }

  // 从后端加载用户真实资料
  async loadUserInfo(): Promise<void> {
    try {
      const token = await storage.get('token')
      if (!token) return
      const res = await request.get(API.USER.INFO) as Record<string, Object>
      if (res.code === 200) {
        const data = res.data as Record<string, Object>
        let ui = new UserInfoData()
        ui.avatar = (data.avatar as string) || mockUserInfo.avatar
        ui.uname = (data.uname as string) || this.uname
        ui.sex = (data.sex as string) ?? '0'
        ui.sex_tit = (data.sex_tit as string) || ''
        ui.country = (data.country as string) || ''
        let created = (data.created_at as string) || ''
        ui.reg_time = created.split('T')[0]
        ui.signature = (data.signature as string) || ''
        this.userInfo = ui
        AppStorage.setOrCreate('uname', ui.uname)
      }
    } catch (err) {
      console.error('加载用户信息失败:', JSON.stringify(err))
    }
  }

  async loadData(): Promise<void> {
    this.loading = true
    await Promise.all([
      this.loadUserInfo(),
      new Promise<void>((resolve: Function) => setTimeout(resolve, 600))
    ])

    let raw = mockWallpapers.slice(0, 9)
    let wl: WallpaperItem[] = []
    for (let i = 0; i < raw.length; i++) {
      let w: WallpaperItem = {
        id: raw[i].id,
        title: raw[i].title,
        url_type: raw[i].url_type,
        url: raw[i].url,
        is_checked: raw[i].is_checked,
        color: getRandomColor()
      }
      wl.push(w)
    }
    this.wallpapers = wl

    let cl: CollectionItem[] = []
    for (let i = 0; i < mockCollections.length; i++) {
      let c: CollectionItem = {
        id: mockCollections[i].id,
        wallpaper_type: mockCollections[i].wallpaper_type,
        wallpaper_url: mockCollections[i].wallpaper_url,
        create_time: mockCollections[i].create_time,
        is_checked: mockCollections[i].is_checked,
        color: getRandomColor(),
        format_date: mockCollections[i].format_date
      }
      cl.push(c)
    }
    this.collections = cl
    this.loading = false
  }

  build() {
    NavDestination() {
      Column() {
        Row() {
          Text('←').fontSize(24).fontColor('#333333').margin({ left: 16 })
            .onClick(() => { this.navPathStack.pop() })
          Text(this.title).fontSize(18).fontWeight(FontWeight.Bold).fontColor('#333333')
            .textAlign(TextAlign.Center).layoutWeight(1)
          Row().width(24).height(24).margin({ right: 16 })
        }.width('100%').height(52).backgroundColor('#ffffff')

        Tabs({ index: this.currentTab }) {
          TabContent() {
            MyWallpaper({ wallpapers: this.wallpapers })
          }.tabBar(this.SubTabBar(this.tabTitles[0], 0))

          TabContent() {
            MyCollection({ collections: $collections })
          }.tabBar(this.SubTabBar(this.tabTitles[1], 1))

          TabContent() {
            UserProfile({ userInfo: $userInfo, uname: $uname })
          }.tabBar(this.SubTabBar(this.tabTitles[2], 2))

          TabContent() {
            AboutPage()
          }.tabBar(this.SubTabBar(this.tabTitles[3], 3))
        }
        .barMode(BarMode.Scrollable).barHeight(42).barBackgroundColor('#ffffff')
        .onChange((index: number) => {
          this.currentTab = index
          this.title = this.tabTitles[index]
        }).layoutWeight(1)

        if (this.loading) { Loading() }
      }.width('100%').height('100%')
    }
    .hideTitleBar(true).backgroundColor('#f5f5f5')
  }

  @Builder
  SubTabBar(title: string, index: number) {
    Text(title)
      .fontSize(14)
      .fontColor(this.currentTab === index ? '#a794ff' : '#999999')
      .fontWeight(this.currentTab === index ? FontWeight.Bold : FontWeight.Normal)
      .padding({ left: 10, right: 10 })
  }
}