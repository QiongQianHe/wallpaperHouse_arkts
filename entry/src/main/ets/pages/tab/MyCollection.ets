import { CollectionItem } from '../../interface/index'

// 我的收藏子页面
@Component
export struct MyCollection {
  @Consume('navPathStack') navPathStack: NavPathStack
  @Link collections: CollectionItem[]
  @State loading: boolean = false

  async deleteAll(): Promise<void> {
    this.collections = []
  }

  build() {
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
            .onClick(() => { this.deleteAll() })
        }
      }.width('100%')
    }
    .scrollBar(BarState.Off)
  }
}
