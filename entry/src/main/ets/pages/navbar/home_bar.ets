import { mockBanners, mockWallpapers } from '../../utils/data_source'
import { BannerItem, WallpaperItem } from '../../interface/index'
import { getRandomColor } from '../../utils/tools'

// 首页Tab - 轮播图 + 推荐壁纸

@Builder
export function HomeBarBuilder() {
  HomeBar()
}

@Component
export struct HomeBar {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State banners: BannerItem[] = []
  @State recommendList: WallpaperItem[] = []
  private swiperController: SwiperController = new SwiperController()

  aboutToAppear(): void {
    this.banners = mockBanners
    let rows = mockWallpapers.slice(0, 6)
    let list: WallpaperItem[] = []
    for (let i = 0; i < rows.length; i++) {
      let item: WallpaperItem = {
        id: rows[i].id,
        title: rows[i].title,
        url_type: rows[i].url_type,
        url: rows[i].url,
        is_checked: rows[i].is_checked,
        color: getRandomColor()
      }
      list.push(item)
    }
    this.recommendList = list
  }

  build() {
    Scroll() {
      Column() {
        // 轮播图
        Swiper(this.swiperController) {
          ForEach(this.banners, (item: BannerItem) => {
            Stack() {
              Image(item.url)
                .width('100%')
                .height('100%')
                .objectFit(ImageFit.Cover)
                .borderRadius(12)

              Column() {
                Text(item.title)
                  .fontSize(16)
                  .fontColor(Color.White)
                  .fontWeight(FontWeight.Bold)
                Text(item.desc)
                  .fontSize(12)
                  .fontColor('rgba(255,255,255,0.8)')
                  .margin({ top: 4 })
              }
              .position({ x: '5%', y: '75%' })
              .alignItems(HorizontalAlign.Start)
            }
            .width('100%')
            .height(220)
            .borderRadius(12)
          }, (item: BannerItem): string => item.id)
        }
        .autoPlay(true)
        .interval(3000)
        .loop(true)
        .indicator(new DotIndicator().color('#cccccc').selectedColor('#a794ff'))
        .width('100%')
        .height(220)
        .borderRadius(12)
        .margin({ top: 16, bottom: 8 })

        Row() {
          Text('🔥 推荐壁纸')
            .fontSize(18).fontWeight(FontWeight.Bold).fontColor('#333333')
          Blank()
          Text('更多 >').fontSize(14).fontColor('#a794ff')
            .onClick(() => { this.navPathStack.pushPathByName('Wallpaper', undefined) })
        }.width('100%').padding({ left: 16, right: 16, top: 12, bottom: 8 })

        Grid() {
          ForEach(this.recommendList, (item: WallpaperItem) => {
            GridItem() {
              Column() {
                Image(item.url).width('100%').height(160).objectFit(ImageFit.Cover)
                  .borderRadius({ topLeft: 10, topRight: 10 }).backgroundColor(item.color)
                Text(item.title).fontSize(13).maxLines(1)
                  .textOverflow({ overflow: TextOverflow.Ellipsis })
                  .padding({ left: 8, right: 8, top: 6, bottom: 6 }).fontColor('#333333')
              }
              .borderRadius(10).backgroundColor(Color.White)
              .shadow({ radius: 8, color: 'rgba(0,0,0,0.05)', offsetX: 0, offsetY: 2 })
              .onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined) })
            }.width('100%')
          }, (item: WallpaperItem): string => item.id)
        }
        .columnsTemplate('1fr 1fr').columnsGap(12).rowsGap(12)
        .width('100%').padding({ left: 16, right: 16 })

        Column() {
          Text('壁纸小屋 v1.0.1').fontSize(11).fontColor('#cccccc')
          Text('Copyright © 2026 Wallpaper House').fontSize(10).fontColor('#dddddd').margin({ top: 4 })
        }.width('100%').padding({ top: 30, bottom: 20 })
      }
    }
    .scrollBar(BarState.Off).edgeEffect(EdgeEffect.Spring)
  }
}
