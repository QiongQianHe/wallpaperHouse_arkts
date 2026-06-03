import { app_name } from '../utils/env'

@Component
export struct TopNav {
  @Prop title: string = ''
  @Prop showBack: boolean = false
  onBack?: () => void

  build() {
    Row() {
      if (this.showBack) {
        Image($r('sys.media.ohos_ic_public_arrow_left'))
          .width(24)
          .height(24)
          .fillColor('#333333')
          .margin({ left: 16 })
          .onClick(() => {
            this.onBack?.()
          })
      }

      Text(this.title || app_name)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .textAlign(TextAlign.Center)
        .layoutWeight(1)

      if (this.showBack) {
        Row().width(24).height(24).margin({ right: 16 })
      }
    }
    .width('100%')
    .height(52)
    .backgroundColor('#ffffff')
    .padding({ left: 12, right: 12 })
  }
}
