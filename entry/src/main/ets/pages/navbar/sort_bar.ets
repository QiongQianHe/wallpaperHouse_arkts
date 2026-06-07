import { mockCategories } from '../../utils/data_source'
import { CategoryItem } from '../../interface/index'
import { getRandomColor } from '../../utils/tools'
import { Footer } from '../../component/Footer'
import { getCurrentLocation, reverseGeocode, GeoInfo } from '../../utils/geolocation'

// 分类Tab - 壁纸分类网格，支持定位导航

@Builder
export function SortBarBuilder() {
  SortBar()
}

@Component
struct SortBar {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State categories: CategoryItem[] = mockCategories
  @State location: string = '获取中...'
  @State geoInfo: GeoInfo = new GeoInfo()

  aboutToAppear(): void {
    this.getLocation()
  }

  async getLocation(): Promise<void> {
    this.location = '正在获取位置...'
    try {
      // 1. 先获取经纬度
      const geo = await getCurrentLocation(10)
      this.geoInfo = geo

      // 2. 逆地理编码获取城市名
      const enriched = await reverseGeocode(geo.latitude, geo.longitude)

      if (enriched.cityName) {
        this.location = ` ${enriched.cityName}`
      } else {
        this.location = ` ${geo.latitude.toFixed(2)}, ${geo.longitude.toFixed(2)}`
      }
    } catch (err) {
      console.error('定位失败:', JSON.stringify(err))
      this.location = '授权后可获取位置'
    }
  }

  build() {
    Scroll() {
      Column() {
        // 定位导航提示
        Row() {
          Text(this.location)
            .fontSize(12)
            .fontColor('#666666')
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8, bottom: 8 })
        .backgroundColor('#f0edff')

        // 分类标题
        Text('📂 壁纸分类')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .width('100%')
          .padding({ left: 16, right: 16, top: 16, bottom: 12 })

        // 分类网格
        Grid() {
          ForEach(this.categories, (item: CategoryItem, idx: number) => {
            GridItem() {
              Column() {
                Text(item.icon)
                  .fontSize(32)
                Text(item.name)
                  .fontSize(13)
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#333333')
                  .margin({ top: 6 })
                Text(`${item.count}张`)
                  .fontSize(11)
                  .fontColor('#999999')
                  .margin({ top: 2 })
              }
              .width('100%')
              .height(100)
              .justifyContent(FlexAlign.Center)
              .borderRadius(12)
              .backgroundColor(Color.White)
              .shadow({ radius: 6, color: 'rgba(0,0,0,0.04)', offsetX: 0, offsetY: 1 })
              .onClick(() => {
                this.navPathStack.pushPathByName('Wallpaper', undefined)
              })
            }
            .width('100%')
          }, (item: CategoryItem) => item.id)
        }
        .columnsTemplate('1fr 1fr 1fr 1fr')
        .columnsGap(8)
        .rowsGap(8)
        .width('100%')
        .padding({ left: 16, right: 16 })

        Footer()
      }
    }
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
  }
}