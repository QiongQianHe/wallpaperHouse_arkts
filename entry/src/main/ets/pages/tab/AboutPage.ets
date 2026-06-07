import { toast } from '../../component/ShowToast'

// 关于子页面
@Component
export struct AboutPage {
  aboutLinks: AboutLinkItem[] = []

  aboutToAppear(): void {
    let a1 = new AboutLinkItem(); a1.title = 'GitHub'; a1.url = 'https://github.com'
    let a2 = new AboutLinkItem(); a2.title = 'Gitee'; a2.url = 'https://gitee.com'
    let a3 = new AboutLinkItem(); a3.title = '意见反馈'; a3.url = ''
    this.aboutLinks = [a1, a2, a3]
  }

  build() {
    Scroll() {
      Column() {
        Column() {
          Text('💌').fontSize(48).margin({ top: 14 })
          Text('壁纸小屋').fontSize(18).fontWeight(FontWeight.Bold).margin({ top: 14 })
          Text('v1.0.1').fontSize(12).fontColor('#999999').margin({ top: 6 })
        }.padding({ top: 40, bottom: 30 })

        List() {
          ForEach(this.aboutLinks, (item: AboutLinkItem) => {
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
          }, (item: AboutLinkItem): string => item.title)
        }
        .width('100%').divider({ strokeWidth: 0.5, color: '#f0f0f0', startMargin: 16 })

        Column() {
          Text('Copyright © 2026 Wallpaper House').fontSize(11).fontColor('#cccccc')
        }.width('100%').padding({ top: 40, bottom: 20 })
      }.width('100%')
    }
    .scrollBar(BarState.Off)
  }
}

class AboutLinkItem {
  title: string = ''
  url: string = ''
}
