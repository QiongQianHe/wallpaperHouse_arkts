import { WallpaperItem } from '../../interface/index'

// 我的壁纸子页面
@Component
export struct MyWallpaper {
  @Consume('navPathStack') navPathStack: NavPathStack
  @Prop wallpapers: WallpaperItem[] = []

  build() {
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
}
