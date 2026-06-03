import { HomeBarBuilder } from './navbar/home_bar'
import { SortBarBuilder } from './navbar/sort_bar'
import { MineBarBuilder } from './navbar/mine_bar'
import { SignDestination } from './Sign'
import { WallpaperDestination } from './Wallpaper'
import { SetWallpaperDestination } from './SetWallpaper'
import { WatermarkDestination } from './Watermark'
import { MineDetailDestination } from './MineDetail'
import { app_name } from '../utils/env'
import { initMockData } from '../utils/data_source'
import storage from '../utils/storage'

// 主入口页面 - Navigation组件框架 + Tabs + 子页面路由
// 使用 Navigation + NavPathStack 实现组件导航

@Entry
@Component
struct Index {
  @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack()
  @State currentIndex: number = 0
  @State isLoggedIn: boolean = false

  async aboutToAppear(): Promise<void> {
    // 初始化Mock数据和缓存
    initMockData()
    await storage.init(getContext(this))
    const token = await storage.get('token')
    this.isLoggedIn = token !== ''
  }

  @Builder
  PagesMap(name: string, param: object) {
    if (name === 'Sign') {
      SignDestination()
    } else if (name === 'Wallpaper') {
      WallpaperDestination()
    } else if (name === 'SetWallpaper') {
      SetWallpaperDestination()
    } else if (name === 'Watermark') {
      WatermarkDestination()
    } else if (name === 'MineDetail') {
      MineDetailDestination()
    }
  }

  build() {
    Navigation(this.navPathStack) {
      Column() {
        // 顶部导航栏
        Row() {
          Text(app_name)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .textAlign(TextAlign.Center)
            .layoutWeight(1)
          Text('🔍')
            .fontSize(22)
            .margin({ right: 16 })
        }
        .width('100%')
        .height(52)
        .backgroundColor('#ffffff')
        .padding({ left: 16, right: 4 })

        // Tab 内容区域（占据剩余空间）
        Tabs({ index: this.currentIndex }) {
          TabContent() {
            HomeBarBuilder()
          }
          .tabBar(this.TabBarItem('🏠', '首页', 0))

          TabContent() {
            SortBarBuilder()
          }
          .tabBar(this.TabBarItem('📂', '分类', 1))

          TabContent() {
            MineBarBuilder()
          }
          .tabBar(this.TabBarItem('👤', '我的', 2))
        }
        .barPosition(BarPosition.End)  // TabBar 在底部
        .barMode(BarMode.Fixed)
        .barHeight(56)
        .barBackgroundColor('#ffffff')
        .onChange((index: number) => {
          this.currentIndex = index
        })
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#f5f5f5')
    }
    .mode(NavigationMode.Stack)
    .navDestination(this.PagesMap)
    .hideTitleBar(true)
    .hideToolBar(true)
  }

  @Builder
  TabBarItem(icon: string, title: string, idx: number) {
    Column() {
      Text(icon)
        .fontSize(22)
        .opacity(this.currentIndex === idx ? 1 : 0.45)
      Text(title)
        .fontSize(11)
        .fontColor(this.currentIndex === idx ? '#a794ff' : '#999999')
        .margin({ top: 2 })
    }
    .justifyContent(FlexAlign.Center)
    .width('100%')
    .height('100%')
  }
}