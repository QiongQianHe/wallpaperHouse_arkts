import { toast } from '../../component/ShowToast'
import { API } from '../../utils/api_config'
import request from '../../utils/http'
import { UserInfoData } from '../../interface/index'
import { mockUserInfo } from '../../utils/data_source'

// 性别选项 — Select 下拉
const GENDER_OPTIONS: SelectOption[] = [
  { value: '保密' }, { value: '男' }, { value: '女' }
]
const GENDER_VALUES: string[] = ['0', '1', '2']

// 常用国家选项 — Select 下拉
const COUNTRY_OPTIONS: SelectOption[] = [
  { value: '中国' }, { value: '美国' }, { value: '日本' },
  { value: '韩国' }, { value: '英国' }, { value: '法国' },
  { value: '德国' }, { value: '加拿大' }, { value: '澳大利亚' },
  { value: '其他' }
]

// 通用编辑弹框 — 文本输入（昵称、签名）
@CustomDialog
struct EditFieldDialog {
  controller: CustomDialogController
  title: string = ''
  placeholder: string = ''
  getInitialValue: () => string = () => ''
  onConfirm?: (newVal: string) => void
  @State inputText: string = ''

  aboutToAppear(): void {
    this.inputText = this.getInitialValue()
  }

  build() {
    Column() {
      Text(this.title).fontSize(18).fontWeight(FontWeight.Bold)
      TextInput({ text: this.inputText, placeholder: this.placeholder })
        .width('90%').height(46).borderRadius(10).fontSize(15)
        .margin({ top: 20, bottom: 20 })
        .onChange((v: string) => { this.inputText = v })
      Row() {
        Button('取消').backgroundColor('#eeeeee').fontColor('#333333')
          .width('42%').height(42).borderRadius(21)
          .onClick(() => { this.controller.close() })
        Button('确定').backgroundColor('#a794ff').fontColor(Color.White)
          .width('42%').height(42).borderRadius(21).margin({ left: 12 })
          .onClick(() => {
            if (this.onConfirm) { this.onConfirm(this.inputText) }
            this.controller.close()
          })
      }
    }
    .backgroundColor(Color.White).borderRadius(14).padding({ top: 25, bottom: 20 }).width('90%')
  }
}

interface EditFieldDialogParams {
  title: string
  placeholder: string
  getInitialValue: () => string
  onConfirm: (v: string) => void
}

// Select 选择弹框（性别、国家）
@CustomDialog
struct SelectFieldDialog {
  controller: CustomDialogController
  title: string = ''
  options: SelectOption[] = []
  initialIndex: number = 0
  onConfirm?: (value: string) => void
  @State currentIndex: number = 0

  aboutToAppear(): void {
    this.currentIndex = this.initialIndex
  }

  build() {
    Column() {
      Text(this.title).fontSize(18).fontWeight(FontWeight.Bold).margin({ top: 6 })

      Select(this.options)
        .selected(this.currentIndex)
        .value(this.options[this.currentIndex]?.value || '')
        .font({ size: 15 })
        .width('80%')
        .margin({ top: 20, bottom: 20 })
        .onSelect((index: number): void => {
          this.currentIndex = index
        })

      Row() {
        Button('取消').backgroundColor('#eeeeee').fontColor('#333333')
          .width('42%').height(42).borderRadius(21)
          .onClick(() => { this.controller.close() })
        Button('确定').backgroundColor('#a794ff').fontColor(Color.White)
          .width('42%').height(42).borderRadius(21).margin({ left: 12 })
          .onClick(() => {
            if (this.onConfirm) {
              this.onConfirm(this.options[this.currentIndex].value as string)
            }
            this.controller.close()
          })
      }
    }
    .backgroundColor(Color.White).borderRadius(14).padding({ top: 25, bottom: 20 }).width('90%')
  }
}

interface SelectFieldDialogParams {
  title: string
  options: SelectOption[]
  initialIndex: number
  onConfirm: (v: string) => void
}

// 个人信息子页面
@Component
export struct UserProfile {
  @Link userInfo: UserInfoData
  @Link uname: string

  // 昵称编辑弹框
  nameDialog: CustomDialogController = new CustomDialogController({
    builder: EditFieldDialog({
      title: '编辑昵称',
      placeholder: '请输入昵称',
      getInitialValue: (): string => this.userInfo.uname,
      onConfirm: (v: string): void => { this.uname = v; this.userInfo.uname = v }
    } as EditFieldDialogParams),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -40 },
    autoCancel: true,
    customStyle: true
  })

  // 签名编辑弹框
  signDialog: CustomDialogController = new CustomDialogController({
    builder: EditFieldDialog({
      title: '编辑个人简介',
      placeholder: '介绍一下自己吧',
      getInitialValue: (): string => this.userInfo.signature,
      onConfirm: (v: string): void => { this.userInfo.signature = v }
    } as EditFieldDialogParams),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -40 },
    autoCancel: true,
    customStyle: true
  })

  // 性别选择弹框
  genderDialog: CustomDialogController = new CustomDialogController({
    builder: SelectFieldDialog({
      title: '选择性别',
      options: GENDER_OPTIONS,
      initialIndex: this.genderIndex,
      onConfirm: (value: string): void => {
        let idx = GENDER_OPTIONS.findIndex(
          (opt: SelectOption): boolean => opt.value === value
        )
        if (idx >= 0) {
          this.userInfo.sex = GENDER_VALUES[idx]
          this.userInfo.sex_tit = value
        }
      }
    } as SelectFieldDialogParams),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -40 },
    autoCancel: true,
    customStyle: true
  })

  // 国家选择弹框
  countryDialog: CustomDialogController = new CustomDialogController({
    builder: SelectFieldDialog({
      title: '选择国家',
      options: COUNTRY_OPTIONS,
      initialIndex: this.countryIndex,
      onConfirm: (value: string): void => {
        this.userInfo.country = value
      }
    } as SelectFieldDialogParams),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -40 },
    autoCancel: true,
    customStyle: true
  })

  // 根据性别值获取 Select 选中索引
  get genderIndex(): number {
    let idx = GENDER_VALUES.indexOf(this.userInfo.sex)
    return idx >= 0 ? idx : 0
  }

  // 根据国家值获取 Select 选中索引
  get countryIndex(): number {
    let idx = COUNTRY_OPTIONS.findIndex(
      (opt: SelectOption): boolean => opt.value === this.userInfo.country
    )
    return idx >= 0 ? idx : 0
  }

  async syncToServer(): Promise<void> {
    try {
      let updateData: Record<string, Object> = {}
      updateData['sex'] = this.userInfo.sex
      updateData['sex_tit'] = this.userInfo.sex_tit
      updateData['country'] = this.userInfo.country
      updateData['signature'] = this.userInfo.signature
      await request.put(API.USER.UPDATE, updateData)
      toast.success('资料已保存')
    } catch (err) {
      console.error('保存失败:', JSON.stringify(err))
      toast.error('保存失败，请重试')
    }
  }

  @Builder
  ReadOnlyRow(label: string, value: string) {
    Row() {
      Text(label).fontSize(15).fontColor('#666666').layoutWeight(1)
      Text(value).fontSize(15).fontColor('#333333')
    }.width('90%').height(56)
    Row().width('90%').height(0.5).backgroundColor('#f0f0f0')
  }

  build() {
    Scroll() {
      Column() {
        // 头像 + 昵称 + 注册日期 头部
        Row() {
          Image(this.userInfo.avatar|| mockUserInfo.avatar)
            .width(60).height(60).borderRadius(30).border({ width: 2, color: '#a794ff' })
          Column() {
            Text(this.userInfo.uname).fontSize(18).fontWeight(FontWeight.Bold)
            Text(this.userInfo.reg_time).fontSize(12).fontColor('#999999').margin({ top: 4 })
          }.alignItems(HorizontalAlign.Start).margin({ left: 16 })
          Blank()
        }.width('90%').padding({ top: 20, bottom: 20 })

        Row().width('90%').height(1).backgroundColor('#f0f0f0')

        // 昵称 — 可编辑
        Row() {
          Text('昵称').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.uname || '未设置').fontSize(15).fontColor('#333333').margin({ right: 6 })
          Text('>').fontSize(16).fontColor('#cccccc')
        }.width('90%').height(56)
        .onClick((): void => { this.nameDialog.open() })
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')

        // 性别 — 只读点击行，点击弹出选择框
        Row() {
          Text('性别').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.sex_tit || '未设置').fontSize(15).fontColor('#333333').margin({ right: 6 })
          Text('>').fontSize(16).fontColor('#cccccc')
        }.width('90%').height(56)
        .onClick((): void => { this.genderDialog.open() })
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')

        // 国家 — 只读点击行，点击弹出选择框
        Row() {
          Text('国家').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.country || '未设置').fontSize(15).fontColor('#333333').margin({ right: 6 })
          Text('>').fontSize(16).fontColor('#cccccc')
        }.width('90%').height(56)
        .onClick((): void => { this.countryDialog.open() })
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')

        // 个人简介 — 可编辑
        Row() {
          Text('个人简介').fontSize(15).fontColor('#666666').layoutWeight(1)
          Text(this.userInfo.signature || '未设置').fontSize(15).fontColor('#333333').margin({ right: 6 })
          Text('>').fontSize(16).fontColor('#cccccc')
        }.width('90%').height(56)
        .onClick((): void => { this.signDialog.open() })
        Row().width('90%').height(0.5).backgroundColor('#f0f0f0')

        Button('保存修改').fontSize(14).backgroundColor('#a794ff').fontColor(Color.White)
          .borderRadius(20).height(40).width('60%').margin({ top: 24 })
          .onClick(() => { this.syncToServer() })

      }.width('100%')
    }
    .scrollBar(BarState.Off)
  }
}