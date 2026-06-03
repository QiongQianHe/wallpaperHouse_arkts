import { OperateItem } from '../../interface/index'
import { mockUserInfo } from '../../utils/data_source'
import { toast } from '../../component/ShowToast'
import storage from '../../utils/storage'

// 我的Tab - 用户中心

@Builder
export function MineBarBuilder() {
  MineBar()
}

@Component
export struct MineBar {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State avatar: string = mockUserInfo.avatar
  @State uname: string = mockUserInfo.uname
  @State isLoggedIn: boolean = false

  @State operateList: OperateItem[] = [
    { icon: '🖼️', title: '我的壁纸', routeName: 'MineDetail', params: undefined },
    { icon: '❤️', title: '我的收藏', routeName: 'MineDetail', params: undefined },
    { icon: '✏️', title: '个人信息', routeName: 'MineDetail', params: undefined },
    { icon: '📝', title: '图片水印', routeName: 'Watermark', params: undefined },
    { icon: 'ℹ️', title: '关于壁纸', routeName: 'MineDetail', params: undefined },
  ]

  async aboutToAppear(): Promise<void> {
    const token = await storage.get('token')
    this.isLoggedIn = token !== ''
    if (this.isLoggedIn) {
      const savedName = await storage.get('uname')
      if (savedName) {
        this.uname = savedName
      }
    }
  }

  async logout(): Promise<void> {
    await storage.clear()
    this.isLoggedIn = false
    this.uname = '未登录'
    toast.success('已退出登录')
    this.navPathStack.clear()
    this.navPathStack.pushPathByName('Sign', undefined)
  }

  build() {
    Scroll() {
      Column() {
        // 用户头像区域
        Column() {
          Image(this.avatar)
            .width(70)
            .height(70)
            .borderRadius(35)
            .border({ width: 3, color: '#a794ff' })

          Text(this.isLoggedIn ? this.uname : '未登录')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ top: 12 })

          if (!this.isLoggedIn) {
            Button('登录 / 注册')
              .fontSize(13)
              .backgroundColor('#a794ff')
              .fontColor(Color.White)
              .borderRadius(20)
              .height(36)
              .margin({ top: 12 })
              .onClick(() => {
                this.navPathStack.pushPathByName('Sign', undefined)
              })
          } else {
            Button('退出登录')
              .fontSize(12)
              .backgroundColor('#f0f0f0')
              .fontColor('#999999')
              .borderRadius(16)
              .height(30)
              .margin({ top: 8 })
              .onClick(() => {
                AlertDialog.show({
                  title: '提示',
                  message: '确定要退出登录吗？',
                  primaryButton: {
                    value: '取消',
                    action: (): void => {}
                  },
                  secondaryButton: {
                    value: '确定',
                    action: (): void => {
                      this.logout()
                    }
                  }
                })
              })
          }
        }
        .width('100%')
        .padding({ top: 40, bottom: 20 })
        .backgroundColor('#ffffff')

        // 操作列表
        List() {
          ForEach(this.operateList, (item: OperateItem, idx: number) => {
            ListItem() {
              Row() {
                Text(item.icon)
                  .fontSize(22)
                  .margin({ left: 16 })

                Text(item.title)
                  .fontSize(15)
                  .fontColor('#333333')
                  .layoutWeight(1)
                  .margin({ left: 12 })

                Image($r('sys.media.ohos_ic_public_arrow_right'))
                  .width(20)
                  .height(20)
                  .fillColor('#cccccc')
                  .margin({ right: 16 })
              }
              .width('100%')
              .height(56)
              .alignItems(VerticalAlign.Center)
            }
            .onClick(() => {
              this.navPathStack.pushPathByName(item.routeName, undefined)
            })
          }, (item: OperateItem) => item.title)
        }
        .width('100%')
        .margin({ top: 12 })
        .divider({ strokeWidth: 0.5, color: '#f0f0f0', startMargin: 52 })

        // Footer栏
        Column() {
          Text('壁纸小屋 v1.0.1')
            .fontSize(11)
            .fontColor('#cccccc')
          Text('Copyright © 2026 Wallpaper House')
            .fontSize(10)
            .fontColor('#dddddd')
            .margin({ top: 4 })
        }
        .width('100%')
        .padding({ top: 30, bottom: 20 })
      }
    }
    .scrollBar(BarState.Off)
  }
}
