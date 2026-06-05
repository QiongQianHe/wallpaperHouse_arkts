import { toast } from '../component/ShowToast'
import { app_name } from '../utils/env'

// 图片水印页面 - NavDestination子页面
// 功能：输入水印文字 → 预览带水印的壁纸效果 → 保存
// 使用 Canvas 或 Stack 叠加实现水印效果

@Builder
export function WatermarkDestination() {
  WatermarkDestinationComponent()
}

@Component
struct WatermarkDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State watermarkText: string = '壁纸小屋'
  @State fontSize: number = 28
  @State watermarkAlpha: number = 0.4
  @State textColor: string = '#ffffff'
  @State selectedImage: string = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'
  @State showColorPicker: boolean = false

  // 预设颜色
  colorOptions: string[] = ['#ffffff', '#000000', '#ff4d4f', '#1890ff', '#52c41a', '#faad14']

  build() {
    NavDestination() {
      Column() {
        // 顶部导航
        Row() {
          Image($r('sys.media.ohos_ic_public_arrow_left'))
            .width(24)
            .height(24)
            .fillColor('#333333')
            .margin({ left: 16 })
            .onClick(() => {
              this.navPathStack.pop()
            })

          Text('图片水印')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .textAlign(TextAlign.Center)
            .layoutWeight(1)

          Text('保存')
            .fontSize(14)
            .fontColor('#a794ff')
            .margin({ right: 16 })
            .onClick(() => {
              toast.success('水印图片已保存')
            })
        }
        .width('100%')
        .height(52)
        .backgroundColor('#ffffff')

        Scroll() {
          Column() {
            // 图片预览区域（含水印效果）
            Stack() {
              Image(this.selectedImage)
                .width('100%')
                .height(320)
                .objectFit(ImageFit.Cover)
                .borderRadius(12)

              // 水印文字叠加
              Text(this.watermarkText)
                .fontSize(this.fontSize)
                .fontColor(this.textColor)
                .opacity(this.watermarkAlpha)
                .fontWeight(FontWeight.Bold)
                .rotate({ angle: -30 })
                .position({ x: '30%', y: '40%' })

              // 第二个水印（右下）
              Text(this.watermarkText)
                .fontSize(this.fontSize - 6)
                .fontColor(this.textColor)
                .opacity(this.watermarkAlpha * 0.7)
                .fontWeight(FontWeight.Bold)
                .rotate({ angle: -30 })
                .position({ x: '50%', y: '60%' })
            }
            .width('100%')
            .height(320)
            .borderRadius(12)
            .margin({ top: 16, left: 16, right: 16 })

            // 图库选择按钮
            Row() {
              Text('🖼️')
                .fontSize(18)
                .margin({ right: 6 })
              Text('选择图片')
                .fontSize(14)
                .fontColor('#a794ff')
            }
            .margin({ top: 12, left: 16 })
            .onClick(() => {
              toast.info('请从相册选择图片')
            })

            // 水印文字设置
            Column() {
              Text('水印文字')
                .fontSize(15)
                .fontWeight(FontWeight.Medium)
                .fontColor('#333333')
                .width('100%')
                .padding({ left: 2, top: 16, bottom: 8 })

              TextInput({ text: this.watermarkText, placeholder: '请输入水印文字' })
                .placeholderFont({ size: 14 })
                .width('100%')
                .height(44)
                .borderRadius(8)
                .backgroundColor('#f5f5f5')
                .fontSize(15)
                .onChange((value: string) => {
                  this.watermarkText = value
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16 })

            // 字号设置
            Column() {
              Text('字号大小: ' + this.fontSize + 'px')
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .fontColor('#333333')
                .width('100%')
                .padding({ left: 2, top: 16, bottom: 8 })

              Slider({
                value: this.fontSize,
                min: 16,
                max: 60,
                step: 2,
              })
                .width('100%')
                .blockColor('#a794ff')
                .trackColor('#e0e0e0')
                .selectedColor('#a794ff')
                .onChange((value: number) => {
                  this.fontSize = value
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16 })

            // 透明度设置
            Column() {
              Text('透明度: ' + Math.round(this.watermarkAlpha * 100) + '%')
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .fontColor('#333333')
                .width('100%')
                .padding({ left: 2, top: 16, bottom: 8 })

              Slider({
                value: this.watermarkAlpha,
                min: 0.1,
                max: 1.0,
                step: 0.05,
              })
                .width('100%')
                .blockColor('#a794ff')
                .trackColor('#e0e0e0')
                .selectedColor('#a794ff')
                .onChange((value: number) => {
                  this.watermarkAlpha = value
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16 })

            // 颜色选择
            Column() {
              Text('水印颜色')
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .fontColor('#333333')
                .width('100%')
                .padding({ left: 2, top: 16, bottom: 8 })

              Row() {
                ForEach(this.colorOptions, (color: string) => {
                  Column()
                    .width(36)
                    .height(36)
                    .borderRadius(18)
                    .backgroundColor(color)
                    .border({ width: this.textColor === color ? 3 : 1.5, color: this.textColor === color ? '#a794ff' : '#e0e0e0' })
                    .margin({ right: 12 })
                    .onClick(() => {
                      this.textColor = color
                    })
                })
              }
              .width('100%')
            }
            .width('100%')
            .padding({ left: 16, right: 16 })

            // 底部Footer
            Column() {
              Text('壁纸小屋 水印工具')
                .fontSize(11)
                .fontColor('#cccccc')
            }
            .width('100%')
            .padding({ top: 30, bottom: 20 })
          }
        }
        .scrollBar(BarState.Off)
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
    }
    .hideTitleBar(true)
    .backgroundColor('#f8f8f8')
  }
}
