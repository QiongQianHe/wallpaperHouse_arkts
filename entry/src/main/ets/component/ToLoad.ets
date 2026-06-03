// 下拉刷新、上拉加载、已到底 组件

@Component
export struct PullDown {
  @Prop hei: number = 25
  @Prop pullText: string = '松开刷新'

  build() {
    Row() {
      LoadingProgress()
        .width(20)
        .height(20)
        .color('#a794ff')
      Text(this.pullText)
        .fontSize(12)
        .fontColor('#999999')
        .margin({ left: 8 })
    }
    .width('100%')
    .height(this.hei)
    .justifyContent(FlexAlign.Center)
  }
}

@Component
export struct PullUp {
  build() {
    Row() {
      LoadingProgress()
        .width(16)
        .height(16)
        .color('#a794ff')
      Text('加载中...')
        .fontSize(12)
        .fontColor('#999999')
        .margin({ left: 8 })
    }
    .width('100%')
    .height(50)
    .justifyContent(FlexAlign.Center)
  }
}

@Component
export struct InEnd {
  build() {
    Text('—— 已经到底了 ——')
      .fontSize(12)
      .fontColor('#cccccc')
      .width('100%')
      .height(50)
      .textAlign(TextAlign.Center)
  }
}
