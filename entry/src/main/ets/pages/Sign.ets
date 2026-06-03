import { SignForm, SignResponse } from '../interface/index'
import { mockLogin } from '../utils/data_source'
import { use_mock } from '../utils/env'
import storage from '../utils/storage'
import { toast } from '../component/ShowToast'
import request from '../utils/http'

// 登录页面 - NavDestination子页面，登录/注册合一

@Builder
export function SignDestination() {
  SignDestinationComponent()
}

@Component
export struct SignDestinationComponent {
  @Consume('navPathStack') navPathStack: NavPathStack
  @State form: SignForm = { uname: '', password: '' }
  @State loading: boolean = false

  async signIn(): Promise<void> {
    if (!this.form.uname || !this.form.password) {
      toast.error('请输入账号和密码')
      return
    }

    this.loading = true
    try {
      let res: SignResponse
      if (use_mock) {
        // Mock模式
        await new Promise<void>((resolve: Function) => { setTimeout(resolve, 800) })
        res = mockLogin(this.form.uname, this.form.password)
      } else {
        res = await request.post('/api/sign/reg_login', this.form) as SignResponse
      }

      this.loading = false
      if (res.code === 200) {
        await storage.set('token', res.data as string)
        await storage.set('uname', this.form.uname)
        toast.success('登录成功')
        // 返回首页
        this.navPathStack.clear()
      } else {
        toast.error(res.msg as string)
      }
    } catch {
      this.loading = false
      toast.error()
    }
  }

  build() {
    NavDestination() {
      Column() {
        // 顶部返回按钮
        Row() {
          Image($r('sys.media.ohos_ic_public_arrow_left'))
            .width(28)
            .height(28)
            .fillColor('#666666')
            .margin({ left: 16, top: 12 })
            .onClick(() => {
              this.navPathStack.pop()
            })
          Blank()
        }
        .width('100%')
        .height(56)

        // 主内容区域
        Column() {
          // Logo区域
          Column() {
            Text('🖼️')
              .fontSize(52)
            Text('壁纸小屋')
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
              .margin({ top: 14 })
            Text('发现美好，装点生活')
              .fontSize(13)
              .fontColor('#999999')
              .margin({ top: 6 })
          }
          .height(200)
          .justifyContent(FlexAlign.Center)

          // 账号输入
          Column() {
            TextInput({ text: this.form.uname, placeholder: '请输入账号' })
              .placeholderFont({ size: 14, weight: 400 })
              .caretColor('#a794ff')
              .width('100%')
              .height('100%')
              .fontSize(15)
              .fontColor('#333333')
              .backgroundColor('#ffffff')
              .onChange((value: string) => {
                this.form.uname = value
              })
          }
          .width('88%')
          .height(50)
          .backgroundColor('#ffffff')
          .borderRadius(12)
          .borderWidth(1.5)
          .borderColor('#a794ff')

          // 密码输入
          Column() {
            TextInput({ text: this.form.password, placeholder: '请输入密码' })
              .placeholderFont({ size: 14, weight: 400 })
              .caretColor('#a794ff')
              .type(InputType.Password)
              .showPasswordIcon(false)
              .width('100%')
              .height('100%')
              .fontSize(15)
              .fontColor('#333333')
              .backgroundColor('#ffffff')
              .onChange((value: string) => {
                this.form.password = value
              })
          }
          .width('88%')
          .height(50)
          .backgroundColor('#ffffff')
          .borderRadius(12)
          .borderWidth(1.5)
          .margin({ top: 18 })
          .borderColor('#a794ff')

          // 登录按钮
          Button({ type: ButtonType.Capsule, stateEffect: true }) {
            Row() {
              if (this.loading) {
                LoadingProgress()
                  .width(22)
                  .height(22)
                  .color(Color.White)
                  .margin({ left: 10 })
              }
              Text('登录 / 注册')
                .fontSize(16)
                .fontColor(Color.White)
                .margin({ left: 6 })
            }
            .alignItems(VerticalAlign.Center)
            .height(46)
          }
          .backgroundColor('#a794ff')
          .width('88%')
          .margin({ top: 36 })
          .onClick(() => {
            this.signIn()
          })

          // 提示文字
          Text('首次使用将自动注册账号')
            .fontSize(11)
            .fontColor('#cccccc')
            .margin({ top: 16 })
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Start)
        .linearGradient({
          direction: GradientDirection.Top,
          angle: 180,
          colors: [[0xe9e5fb, 0.0], [0xffffff, 0.4], [0xffffff, 1.0]]
        })
      }
      .width('100%')
      .height('100%')
    }
    .hideTitleBar(true)
    .backgroundColor('#ffffff')
  }
}
