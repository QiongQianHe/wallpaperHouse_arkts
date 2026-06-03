import { mockCategories } from '../../utils/data_source'
import { CategoryItem } from '../../interface/index'
import { getRandomColor } from '../../utils/tools'

// 分类Tab - 壁纸分类网格，支持定位导航

@Builder
export function SortBarBuilder() {
  SortBar()
}

@Component
export struct SortBar {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State categories: CategoryItem[] = mockCategories
  @State location: string = '获取中...'

  aboutToAppear(): void {
    this.getLocation()
  }

  async getLocation(): Promise<void> {
    // 模拟定位数据 - 模拟器上 geoLocationManager 可能不可用
    this.location = '当前位置: 正在获取...'
    await new Promise<void>((resolve: Function) => { setTimeout(resolve, 1000) })
    this.location = '📍 定位服务 (演示功能)'
  }

  build() {
    Scroll() {
      Column() {
        // 定位导航提示
        Row() {
          Text('📍')
            .fontSize(16)
            .margin({ right: 6 })

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

        // Footer栏
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
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
  }
}
