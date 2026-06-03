import { mockWallpapers } from '../utils/data_source'
import { WallpaperItem } from '../interface/index'
import { toast } from '../component/ShowToast'

// 壁纸详情页 - NavDestination子页面
// 含：全屏预览、收藏、设为壁纸弹框

@CustomDialog
struct SetWallpaperDialog {
  controller: CustomDialogController
  currentItem: WallpaperItem = { id: '', title: '', url_type: 1, url: '', is_checked: false }

  build() {
    Column() {
      Text('设置壁纸')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      Button({ type: ButtonType.Normal }) {
        Text('应用锁屏').fontColor('#333333').width('90%')
      }
      .width('100%')
      .height(50)
      .backgroundColor('#ffffff')
      .onClick(() => {
        toast.success('已设为锁屏壁纸')
        this.controller.close()
      })

      Button({ type: ButtonType.Normal }) {
        Text('应用桌面').fontColor('#333333').width('90%')
      }
      .width('100%')
      .height(50)
      .backgroundColor('#ffffff')
      .onClick(() => {
        toast.success('已设为桌面壁纸')
        this.controller.close()
      })

      Button({ type: ButtonType.Normal }) {
        Text('应用全部').fontColor('#333333').width('90%')
      }
      .width('100%')
      .height(50)
      .backgroundColor('#ffffff')
      .onClick(() => {
        toast.success('已设为锁屏+桌面壁纸')
        this.controller.close()
      })

      Button('取消', { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor('#eeeeee')
        .width('90%')
        .height(40)
        .margin({ top: 15 })
        .fontColor('#333333')
        .onClick(() => {
          this.controller.close()
        })
    }
    .backgroundColor('#ffffff')
    .borderRadius(14)
    .padding({ top: 25, bottom: 20 })
    .width('90%')
  }
}

@Builder
export function SetWallpaperDestination() {
  SetWallpaperDestinationComponent()
}

@Component
export struct SetWallpaperDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State currentItem: WallpaperItem = { id: '', title: '', url_type: 1, url: '', is_checked: false }
  @State isLiked: number = 0
  @State loading: boolean = true

  dialogController: CustomDialogController = new CustomDialogController({
    builder: SetWallpaperDialog({ currentItem: this.currentItem }),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -20 },
    autoCancel: true,
    customStyle: true
  })

  aboutToAppear(): void {
    // 简化处理 - 从Mock数据加载默认壁纸
    this.loading = true
    const found = mockWallpapers.length > 0 ? mockWallpapers[0] : undefined
    if (found) {
      this.currentItem = found
    }
    this.loading = false
  }

  async handleCollect(): Promise<void> {
    this.isLiked = this.isLiked === 0 ? 1 : 0
    toast.info(this.isLiked ? '已收藏' : '已取消收藏')
  }

  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.TopStart }) {
        // 全屏壁纸预览
        Image(this.currentItem.url)
          .width('100%')
          .height('100%')
          .objectFit(ImageFit.Cover)
          .onComplete(() => {
            this.loading = false
          })

        // 返回按钮
        Row() {
          Image($r('sys.media.ohos_ic_public_arrow_left'))
            .width(24)
            .height(24)
            .fillColor(Color.White)
            .margin({ left: 12 })
            .onClick(() => {
              this.navPathStack.pop()
            })
          Blank()
        }
        .width('100%')
        .height(56)
        .position({ x: 0, y: 0 })

        // 底部操作栏
        Row() {
          // 收藏按钮
          Row() {
            Text(this.isLiked === 0 ? '🤍' : '❤️')
              .fontSize(22)
          }
          .width(44)
          .height(44)
          .borderRadius(22)
          .backgroundColor('rgba(0,0,0,0.3)')
          .justifyContent(FlexAlign.Center)
          .onClick(() => {
            this.handleCollect()
          })

          // 应用壁纸按钮
          Button('应用壁纸', { type: ButtonType.Capsule, stateEffect: true })
            .backgroundColor(Color.White)
            .fontColor('#333333')
            .layoutWeight(1)
            .margin({ left: 12 })
            .onClick(() => {
              if (this.dialogController !== undefined) {
                this.dialogController.open()
              }
            })
        }
        .width('90%')
        .position({ x: '5%', y: '90%' })

        // 加载中
        if (this.loading) {
          Stack() {
            LoadingProgress()
              .width(40)
              .height(40)
              .color('#a794ff')
          }
          .width('100%')
          .height('100%')
          .backgroundColor('rgba(0,0,0,0.3)')
        }
      }
      .width('100%')
      .height('100%')
    }
    .hideTitleBar(true)
    .backgroundColor('#000000')
  }
}
