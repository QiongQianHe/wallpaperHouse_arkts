import { mockWallpapers, mockCollections, mockUserInfo } from '../utils/data_source'
import { WallpaperItem, CollectionItem } from '../interface/index'
import { getRandomColor } from '../utils/tools'
import { toast } from '../component/ShowToast'
import { Loading } from '../component/Loading'

// 关于链接类型
class AboutLink {
  title: string = ''
  url: string = ''
}
// 用户信息类型
class UserInfoData {
  avatar: string = ''
  uname: string = ''
  sex_tit: string = ''
  nation: string = ''
  reg_time: string = ''
}

// 个人信息编辑弹框
@CustomDialog
struct EditNameDialog {
  controller: CustomDialogController
  @Link uname: string
  @State inputText: string = ''

  aboutToAppear(): void {
    this.inputText = this.uname
  }

  build() {
    Column() {
      Text('编辑昵称').fontSize(18).fontWeight(FontWeight.Bold)
      TextInput({ text: this.inputText, placeholder: '请输入昵称' })
        .width('90%').height(46).borderRadius(10).fontSize(15)
        .margin({ top: 20, bottom: 20 })
        .onChange((value: string) => { this.inputText = value })
      Row() {
        Button('取消').backgroundColor('#eeeeee').fontColor('#333333')
          .width('42%').height(42).borderRadius(21)
          .onClick(() => { this.controller.close() })
        Button('确定').backgroundColor('#a794ff').fontColor(Color.White)
          .width('42%').height(42).borderRadius(21).margin({ left: 12 })
          .onClick(() => {
            this.uname = this.inputText
            toast.success('昵称已更新')
            this.controller.close()
          })
      }
    }
    .backgroundColor(Color.White).borderRadius(14).padding({ top: 25, bottom: 20 }).width('90%')
  }
}

// 我的详情页 - NavDestination
@Builder
export function MineDetailDestination() {
  MineDetailDestinationComponent()
}

@Component
struct MineDetailDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State currentTab: number = 0
  @State title: string = '我的壁纸'
  @State wallpapers: WallpaperItem[] = []
  @State collections: CollectionItem[] = []
  @State userInfo: UserInfoData = new UserInfoData()
  @State aboutLinks: AboutLink[] = []
  @State loading: boolean = false
  @Provide uname: string = '壁纸爱好者'
  dialogController: CustomDialogController = new CustomDialogController({
    builder: EditNameDialog({ uname: $uname }),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -40 },
    autoCancel: true,
    customStyle: true
  })
  tabTitles: string[] = ['我的壁纸', '我的收藏', '个人信息', '关于']

  aboutToAppear(): void {
    // 初始化用户数据
    let ui = new UserInfoData()
    ui.avatar = mockUserInfo.avatar
    ui.uname = mockUserInfo.uname
    ui.sex_tit = mockUserInfo.sex_tit
    ui.nation = mockUserInfo.nation
    ui.reg_time = mockUserInfo.reg_time
    this.userInfo = ui
    this.uname = ui.uname

    // 初始化about链接
    let a1 = new AboutLink(); a1.title = 'GitHub'; a1.url = 'https://github.com'
    let a2 = new AboutLink(); a2.title = 'Gitee'; a2.url = 'https://gitee.com'
    let a3 = new AboutLink(); a3.title = '意见反馈'; a3.url = ''
    this.aboutLinks = [a1, a2, a3]

    this.loadData()
  }

  async loadData(): Promise<void> {
    this.loading = true
    await new Promise<void>((resolve: Function) => setTimeout(resolve, 600))
    // 初始化壁纸
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
    // 初始化收藏
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

  async deleteCollections(ids: string[]): Promise<void> {
    this.collections = this.collections.filter(c => !ids.includes(c.id))
    toast.success('已删除')
  }

  @Builder
  WallpaperTab() {
    Scroll() {
      Grid() {
        ForEach(this.wallpapers, (item: WallpaperItem) => {
          GridItem() {
            Column() {
              Image(item.url).width('100%').height(180).borderRadius(8).backgroundColor(item.color)
              Text(item.title).fontSize(12).margin({ top: 6 }).maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
            }
            .onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined) })
          }
          .width('100%')
        }, (item: WallpaperItem): string => item.id)
      }
      .columnsTemplate('1fr 1fr 1fr').columnsGap(10).rowsGap(10).width('90%')
    }
    .scrollBar(BarState.Off)
  }

  @Builder
  CollectionTab() {
    Scroll() {
      Column() {
        Grid() {
          ForEach(this.collections, (item: CollectionItem) => {
            GridItem() {
              Stack() {
                Image(item.wallpaper_url).width('100%').height(200).borderRadius(8).backgroundColor(item.color)
                Text(item.format_date).fontSize(10).fontColor(Color.White)
                  .position({ x: '5%', y: 170 })
                  .backgroundColor('rgba(0,0,0,0.4)').borderRadius(6)
                  .padding({ left: 6, right: 6, top: 3, bottom: 3 })
              }
              .onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined) })
            }
            .width('100%')
          }, (item: CollectionItem): string => item.id)
        }
        .columnsTemplate('1fr 1fr 1fr').columnsGap(10).rowsGap(10).width('90%')

        if (this.collections.length > 0) {
          Button('清空收藏').fontSize(13).backgroundColor('#ff4d4f').fontColor(Color.White)
            .borderRadius(20).height(36).margin({ top: 16 })
            .onClick(() => {
              let ids: string[] = []
              for (let i = 0; i < this.collections.length; i++) {
                ids.push(this.collections[i].id)
              }
              this.deleteCollections(ids)
            })
        }
      }.width('100%')
    }
    .scrollBar(BarState.Off)
  }

  @Builder
  UserInfoTab() {
    Scroll() {
      Column() {
        Row() {
          Image(this.userInfo.avatar).width(60).height(60).borderRadius(30).border({ width: 2, color: '#a794ff' })
          Column() {
            Text(this.userInfo.uname).fontSize(18).fontWeight(FontWeight.Bold)
            Text(this.userInfo.reg_time).fontSize(12).fontColor('#999999').margin({ top: 4 })
          }.alignItems(HorizontalAlign.Start).margin({ left: 16 })
          Blank()
        }.width('90%').padding({ top: 20, bottom: 20 })

        Row().width('90%').height(1).backgroundColor('#f0f0f0')
        Row() {
          Text('昵称').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.uname).fontSize(15).fontColor('#333333').margin({ right: 6 })
          Text('>').fontSize(16).fontColor('#cccccc')
        }.width('90%').height(56)
        .onClick(() => {
          if (this.dialogController !== undefined) { this.dialogController.open() }
        })
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')
        Row() {
          Text('性别').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.sex_tit).fontSize(15).fontColor('#333333')
        }.width('90%').height(56)
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')
        Row() {
          Text('国家/地区').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.nation).fontSize(15).fontColor('#333333')
        }.width('90%').height(56)
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')
        Row() {
          Text('注册日期').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.reg_time).fontSize(15).fontColor('#333333')
        }.width('90%').height(56)
      }.width('100%')
    }
    .scrollBar(BarState.Off)
  }

  @Builder
  AboutTab() {
    Scroll() {
      Column() {
        Column() {
          Text('💌').fontSize(48).margin({ top: 14 })
          Text('壁纸小屋').fontSize(18).fontWeight(FontWeight.Bold).margin({ top: 14 })
          Text('v1.0.1').fontSize(12).fontColor('#999999').margin({ top: 6 })
        }.padding({ top: 40, bottom: 30 })

        List() {
          ForEach(this.aboutLinks, (item: AboutLink) => {
            ListItem() {
              Row() {
                Text(item.title).fontSize(15).fontColor('#333333').layoutWeight(1).margin({ left: 16 })
                Text('>').fontSize(18).fontColor('#cccccc').margin({ right: 16 })
              }.width('100%').height(54).alignItems(VerticalAlign.Center)
            }
            .onClick(() => {
              if (item.url) { toast.info('打开链接: ' + item.url) }
              else { toast.info('意见反馈功能') }
            })
          }, (item: AboutLink): string => item.title)
        }
        .width('100%').divider({ strokeWidth: 0.5, color: '#f0f0f0', startMargin: 16 })

        Column() {
          Text('Copyright © 2026 Wallpaper House').fontSize(11).fontColor('#cccccc')
        }.width('100%').padding({ top: 40, bottom: 20 })
      }.width('100%')
    }
    .scrollBar(BarState.Off)
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
          TabContent() { this.WallpaperTab() }.tabBar(this.SubTabBar(this.tabTitles[0], 0))
          TabContent() { this.CollectionTab() }.tabBar(this.SubTabBar(this.tabTitles[1], 1))
          TabContent() { this.UserInfoTab() }.tabBar(this.SubTabBar(this.tabTitles[2], 2))
          TabContent() { this.AboutTab() }.tabBar(this.SubTabBar(this.tabTitles[3], 3))
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
