@Component
export struct Loading {
  build() {
    Stack() {
      Column() {
        LoadingProgress()
          .width(40)
          .height(40)
          .color('#a794ff')
        Text('加载中...')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(255,255,255,0.9)')
  }
}
