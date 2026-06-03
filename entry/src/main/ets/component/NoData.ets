@Component
export struct NoData {
  @Prop type: string = 'bar'
  @Prop state: number = 0

  build() {
    Column() {
      Text(this.state === -1 ? '📡' : '📷')
        .fontSize(60)
        .opacity(0.3)
        .margin({ top: 40 })

      Text(this.state === -1 ? '网络连接异常' : '暂无数据')
        .fontSize(14)
        .fontColor('#999999')
        .margin({ top: 16 })

      if (this.state === -1) {
        Text('请检查网络后重试')
          .fontSize(12)
          .fontColor('#bbbbbb')
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .height(300)
    .justifyContent(FlexAlign.Center)
  }
}
