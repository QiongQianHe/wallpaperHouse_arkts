if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WatermarkDestinationComponent_Params {
    navPathStack?: NavPathStack;
    watermarkText?: string;
    fontSize?: number;
    watermarkAlpha?: number;
    textColor?: string;
    selectedImage?: string;
    showColorPicker?: boolean;
    // 预设颜色
    colorOptions?: string[];
}
import { toast } from "@normalized:N&&&entry/src/main/ets/component/ShowToast&";
// 图片水印页面 - NavDestination子页面
// 功能：输入水印文字 → 预览带水印的壁纸效果 → 保存
// 使用 Canvas 或 Stack 叠加实现水印效果
export function WatermarkDestination(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new WatermarkDestinationComponent(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Watermark.ets", line: 10, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "WatermarkDestinationComponent" });
    }
}
export class WatermarkDestinationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__watermarkText = new ObservedPropertySimplePU('壁纸小屋', this, "watermarkText");
        this.__fontSize = new ObservedPropertySimplePU(28, this, "fontSize");
        this.__watermarkAlpha = new ObservedPropertySimplePU(0.4, this, "watermarkAlpha");
        this.__textColor = new ObservedPropertySimplePU('#ffffff', this, "textColor");
        this.__selectedImage = new ObservedPropertySimplePU('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', this, "selectedImage");
        this.__showColorPicker = new ObservedPropertySimplePU(false
        // 预设颜色
        , this, "showColorPicker");
        this.colorOptions = ['#ffffff', '#000000', '#ff4d4f', '#1890ff', '#52c41a', '#faad14'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WatermarkDestinationComponent_Params) {
        if (params.watermarkText !== undefined) {
            this.watermarkText = params.watermarkText;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.watermarkAlpha !== undefined) {
            this.watermarkAlpha = params.watermarkAlpha;
        }
        if (params.textColor !== undefined) {
            this.textColor = params.textColor;
        }
        if (params.selectedImage !== undefined) {
            this.selectedImage = params.selectedImage;
        }
        if (params.showColorPicker !== undefined) {
            this.showColorPicker = params.showColorPicker;
        }
        if (params.colorOptions !== undefined) {
            this.colorOptions = params.colorOptions;
        }
    }
    updateStateVars(params: WatermarkDestinationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__watermarkText.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
        this.__watermarkAlpha.purgeDependencyOnElmtId(rmElmtId);
        this.__textColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedImage.purgeDependencyOnElmtId(rmElmtId);
        this.__showColorPicker.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__watermarkText.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        this.__watermarkAlpha.aboutToBeDeleted();
        this.__textColor.aboutToBeDeleted();
        this.__selectedImage.aboutToBeDeleted();
        this.__showColorPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navPathStack: ObservedPropertyAbstractPU<NavPathStack>;
    get navPathStack() {
        return this.__navPathStack.get();
    }
    set navPathStack(newValue: NavPathStack) {
        this.__navPathStack.set(newValue);
    }
    private __watermarkText: ObservedPropertySimplePU<string>;
    get watermarkText() {
        return this.__watermarkText.get();
    }
    set watermarkText(newValue: string) {
        this.__watermarkText.set(newValue);
    }
    private __fontSize: ObservedPropertySimplePU<number>;
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: number) {
        this.__fontSize.set(newValue);
    }
    private __watermarkAlpha: ObservedPropertySimplePU<number>;
    get watermarkAlpha() {
        return this.__watermarkAlpha.get();
    }
    set watermarkAlpha(newValue: number) {
        this.__watermarkAlpha.set(newValue);
    }
    private __textColor: ObservedPropertySimplePU<string>;
    get textColor() {
        return this.__textColor.get();
    }
    set textColor(newValue: string) {
        this.__textColor.set(newValue);
    }
    private __selectedImage: ObservedPropertySimplePU<string>;
    get selectedImage() {
        return this.__selectedImage.get();
    }
    set selectedImage(newValue: string) {
        this.__selectedImage.set(newValue);
    }
    private __showColorPicker: ObservedPropertySimplePU<boolean>;
    get showColorPicker() {
        return this.__showColorPicker.get();
    }
    set showColorPicker(newValue: boolean) {
        this.__showColorPicker.set(newValue);
    }
    // 预设颜色
    private colorOptions: string[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(29:7)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部导航
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Watermark.ets(31:9)", "entry");
                    // 顶部导航
                    Row.width('100%');
                    // 顶部导航
                    Row.height(52);
                    // 顶部导航
                    Row.backgroundColor('#ffffff');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125830087, "type": 20000, params: [], "bundleName": "com.example.endapp", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/Watermark.ets(32:11)", "entry");
                    Image.width(24);
                    Image.height(24);
                    Image.fillColor('#333333');
                    Image.margin({ left: 16 });
                    Image.onClick(() => {
                        this.navPathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('图片水印');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(41:11)", "entry");
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                    Text.textAlign(TextAlign.Center);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('保存');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(48:11)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#a794ff');
                    Text.margin({ right: 16 });
                    Text.onClick(() => {
                        toast.success('水印图片已保存');
                    });
                }, Text);
                Text.pop();
                // 顶部导航
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.debugLine("entry/src/main/ets/pages/Watermark.ets(60:9)", "entry");
                    Scroll.scrollBar(BarState.Off);
                    Scroll.layoutWeight(1);
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(61:11)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片预览区域（含水印效果）
                    Stack.create();
                    Stack.debugLine("entry/src/main/ets/pages/Watermark.ets(63:13)", "entry");
                    // 图片预览区域（含水印效果）
                    Stack.width('100%');
                    // 图片预览区域（含水印效果）
                    Stack.height(320);
                    // 图片预览区域（含水印效果）
                    Stack.borderRadius(12);
                    // 图片预览区域（含水印效果）
                    Stack.margin({ top: 16, left: 16, right: 16 });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.selectedImage);
                    Image.debugLine("entry/src/main/ets/pages/Watermark.ets(64:15)", "entry");
                    Image.width('100%');
                    Image.height(320);
                    Image.objectFit(ImageFit.Cover);
                    Image.borderRadius(12);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 水印文字叠加
                    Text.create(this.watermarkText);
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(71:15)", "entry");
                    // 水印文字叠加
                    Text.fontSize(this.fontSize);
                    // 水印文字叠加
                    Text.fontColor(this.textColor);
                    // 水印文字叠加
                    Text.opacity(this.watermarkAlpha);
                    // 水印文字叠加
                    Text.fontWeight(FontWeight.Bold);
                    // 水印文字叠加
                    Text.rotate({ angle: -30 });
                    // 水印文字叠加
                    Text.position({ x: '30%', y: '40%' });
                }, Text);
                // 水印文字叠加
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 第二个水印（右下）
                    Text.create(this.watermarkText);
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(80:15)", "entry");
                    // 第二个水印（右下）
                    Text.fontSize(this.fontSize - 6);
                    // 第二个水印（右下）
                    Text.fontColor(this.textColor);
                    // 第二个水印（右下）
                    Text.opacity(this.watermarkAlpha * 0.7);
                    // 第二个水印（右下）
                    Text.fontWeight(FontWeight.Bold);
                    // 第二个水印（右下）
                    Text.rotate({ angle: -30 });
                    // 第二个水印（右下）
                    Text.position({ x: '50%', y: '60%' });
                }, Text);
                // 第二个水印（右下）
                Text.pop();
                // 图片预览区域（含水印效果）
                Stack.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图库选择按钮
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Watermark.ets(94:13)", "entry");
                    // 图库选择按钮
                    Row.margin({ top: 12, left: 16 });
                    // 图库选择按钮
                    Row.onClick(() => {
                        toast.info('请从相册选择图片');
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('🖼️');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(95:15)", "entry");
                    Text.fontSize(18);
                    Text.margin({ right: 6 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('选择图片');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(98:15)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#a794ff');
                }, Text);
                Text.pop();
                // 图库选择按钮
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 水印文字设置
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(108:13)", "entry");
                    // 水印文字设置
                    Column.width('100%');
                    // 水印文字设置
                    Column.padding({ left: 16, right: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('水印文字');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(109:15)", "entry");
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#333333');
                    Text.width('100%');
                    Text.padding({ left: 2, top: 16, bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ text: this.watermarkText, placeholder: '请输入水印文字' });
                    TextInput.debugLine("entry/src/main/ets/pages/Watermark.ets(116:15)", "entry");
                    TextInput.placeholderFont({ size: 14 });
                    TextInput.width('100%');
                    TextInput.height(44);
                    TextInput.borderRadius(8);
                    TextInput.backgroundColor('#f5f5f5');
                    TextInput.fontSize(15);
                    TextInput.onChange((value: string) => {
                        this.watermarkText = value;
                    });
                }, TextInput);
                // 水印文字设置
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 字号设置
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(131:13)", "entry");
                    // 字号设置
                    Column.width('100%');
                    // 字号设置
                    Column.padding({ left: 16, right: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('字号大小: ' + this.fontSize + 'px');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(132:15)", "entry");
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#333333');
                    Text.width('100%');
                    Text.padding({ left: 2, top: 16, bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Slider.create({
                        value: this.fontSize,
                        min: 16,
                        max: 60,
                        step: 2
                    });
                    Slider.debugLine("entry/src/main/ets/pages/Watermark.ets(139:15)", "entry");
                    Slider.width('100%');
                    Slider.blockColor('#a794ff');
                    Slider.trackColor('#e0e0e0');
                    Slider.selectedColor('#a794ff');
                    Slider.onChange((value: number) => {
                        this.fontSize = value;
                    });
                }, Slider);
                // 字号设置
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 透明度设置
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(157:13)", "entry");
                    // 透明度设置
                    Column.width('100%');
                    // 透明度设置
                    Column.padding({ left: 16, right: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('透明度: ' + Math.round(this.watermarkAlpha * 100) + '%');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(158:15)", "entry");
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#333333');
                    Text.width('100%');
                    Text.padding({ left: 2, top: 16, bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Slider.create({
                        value: this.watermarkAlpha,
                        min: 0.1,
                        max: 1.0,
                        step: 0.05
                    });
                    Slider.debugLine("entry/src/main/ets/pages/Watermark.ets(165:15)", "entry");
                    Slider.width('100%');
                    Slider.blockColor('#a794ff');
                    Slider.trackColor('#e0e0e0');
                    Slider.selectedColor('#a794ff');
                    Slider.onChange((value: number) => {
                        this.watermarkAlpha = value;
                    });
                }, Slider);
                // 透明度设置
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 颜色选择
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(183:13)", "entry");
                    // 颜色选择
                    Column.width('100%');
                    // 颜色选择
                    Column.padding({ left: 16, right: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('水印颜色');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(184:15)", "entry");
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#333333');
                    Text.width('100%');
                    Text.padding({ left: 2, top: 16, bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Watermark.ets(191:15)", "entry");
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const color = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/Watermark.ets(193:19)", "entry");
                            Column.width(36);
                            Column.height(36);
                            Column.borderRadius(18);
                            Column.backgroundColor(color);
                            Column.border({ width: this.textColor === color ? 3 : 1.5, color: this.textColor === color ? '#a794ff' : '#e0e0e0' });
                            Column.margin({ right: 12 });
                            Column.onClick(() => {
                                this.textColor = color;
                            });
                        }, Column);
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.colorOptions, forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Row.pop();
                // 颜色选择
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 底部Footer
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Watermark.ets(211:13)", "entry");
                    // 底部Footer
                    Column.width('100%');
                    // 底部Footer
                    Column.padding({ top: 30, bottom: 20 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('壁纸小屋 水印工具');
                    Text.debugLine("entry/src/main/ets/pages/Watermark.ets(212:15)", "entry");
                    Text.fontSize(11);
                    Text.fontColor('#cccccc');
                }, Text);
                Text.pop();
                // 底部Footer
                Column.pop();
                Column.pop();
                Scroll.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Watermark" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#f8f8f8');
            NavDestination.debugLine("entry/src/main/ets/pages/Watermark.ets(28:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WatermarkDestinationComponent";
    }
}
registerNamedRoute(() => new WatermarkDestinationComponent(undefined, {}), "", { bundleName: "com.example.endapp", moduleName: "entry", pagePath: "pages/Watermark", pageFullPath: "entry/src/main/ets/pages/Watermark", integratedHsp: "false", moduleType: "followWithHap" });
