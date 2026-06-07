// 可复用的页脚组件

@Component
export struct Footer {
  build() {
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