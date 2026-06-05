import { mockWallpapers } from '../utils/data_source'
import { WallpaperItem, PageQuery } from '../interface/index'
import { toast } from '../component/ShowToast'
import { NoData } from '../component/NoData'
import { PullDown, PullUp, InEnd } from '../component/ToLoad'

// 壁纸分类列表 - NavDestination子页面

@Builder
export function WallpaperDestination() {
  WallpaperDestinationComponent()
}

@Component
struct WallpaperDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State list: WallpaperItem[] = []
  @State page: PageQuery = { offset: 1, limit: 10, count: 0 }
  @State loading: boolean = false
  @State isLoad: boolean = false
  @State isPull: boolean = false
  @State isEnd: boolean = false
  @State hei: number = 25
  @State pullText: string = '松开刷新'
  @State typeId: string = ''
  @State title: string = '壁纸中心'
  private scroller: Scroller = new Scroller()

  aboutToAppear(): void {
    this.getWallpapers(true)
  }

  // 通过navPathStack参数获取 - 简化处理，使用Mock数据
  onPageShow(): void {
    // 从首页传来的分类信息暂存于路由
  }

  async getWallpapers(flag: boolean = false): Promise<void> {
    if (flag) {
      this.loading = true
    }
    // Mock数据 - 模拟网络延迟
    await new Promise<void>((resolve: Function) => { setTimeout(resolve, 500) })

    let rows = mockWallpapers
    if (this.typeId) {
      rows = rows.filter(w => w.type_id === this.typeId)
    }

    this.loading = false
    this.isLoad = false

    if (this.isPull || flag) {
      this.list = rows
      this.isPull = false
      this.pullText = '松开刷新'
    } else {
      this.list = [...this.list, ...rows]
    }
    this.page.count = rows.length
  }

  build() {
    NavDestination() {
      Column() {
        // 顶部导航
        Row() {
          Image($r('sys.media.ohos_ic_public_arrow_left'))
            .width(24)
            .height(24)
            .fillColor('#333333')
            .margin({ left: 16 })
            .onClick(() => {
              this.navPathStack.pop()
            })

          Text(this.title)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .textAlign(TextAlign.Center)
            .layoutWeight(1)

          Row().width(24).height(24).margin({ right: 16 })
        }
        .width('100%')
        .height(52)
        .backgroundColor('#ffffff')

        // 无数据
        if (this.page.count === 0 && !this.loading) {
          NoData({ type: 'empty', state: 0 })
        }

        // 下拉刷新
        if (this.isPull) {
          PullDown({ hei: this.hei, pullText: this.pullText })
        }

        // 壁纸网格
        Scroll(this.scroller) {
          Column() {
            Grid() {
              ForEach(this.list, (item: WallpaperItem) => {
                GridItem() {
                  Column() {
                    Image(item.url)
                      .width('100%')
                      .height(320)
                      .borderRadius(10)
                      .backgroundColor(item.color)
                    Text(item.title)
                      .fontSize(14)
                      .margin({ top: 10, left: 5 })
                      .fontColor('#333333')
                  }
                  .alignItems(HorizontalAlign.Start)
                  .onClick(() => {
                    this.navPathStack.pushPathByName('SetWallpaper', undefined)
                  })
                }
                .width('48%')
                .margin({ bottom: 18 })
              }, (item: WallpaperItem) => item.id)
            }
            .columnsTemplate('1fr 1fr')
            .columnsGap(10)
            .rowsGap(10)
            .width('90%')

            if (this.isLoad) {
              PullUp()
            }
            if (this.isEnd) {
              InEnd()
            }
          }
        }
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        .width('100%')
        .layoutWeight(1)
        .onDidScroll(() => {
          const y = this.scroller.currentOffset().yOffset
          if (y > 0) return
          this.pullText = '松开刷新'
          const scrollY = Math.floor(Math.abs(y))
          if (scrollY > 24) {
            this.isPull = true
            this.hei = scrollY
          }
        })
        .onScrollStop(() => {
          if (this.isPull) {
            this.pullText = '刷新中'
            this.page.offset = 1
            this.getWallpapers()
          }
        })

        // 加载中
        if (this.loading) {
          Stack() {
            Column() {
              LoadingProgress()
                .width(36)
                .height(36)
                .color('#a794ff')
              Text('加载中...')
                .fontSize(12)
                .fontColor('#999999')
                .margin({ top: 8 })
            }
          }
          .width('100%')
          .height('100%')
          .backgroundColor('rgba(255,255,255,0.85)')
        }
      }
      .width('100%')
      .height('100%')
    }
    .hideTitleBar(true)
    .backgroundColor('#f5f5f5')
  }
}
