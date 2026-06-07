if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SignDestinationComponent_Params {
    navPathStack?: NavPathStack;
    form?: SignForm;
    loading?: boolean;
}
import type { SignForm, SignResponse } from '../interface/index';
import { mockLogin } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import { use_mock } from "@normalized:N&&&entry/src/main/ets/utils/env&";
import storage from "@normalized:N&&&entry/src/main/ets/utils/storage&";
import { toast } from "@normalized:N&&&entry/src/main/ets/component/ShowToast&";
import request from "@normalized:N&&&entry/src/main/ets/utils/http&";
import { API } from "@normalized:N&&&entry/src/main/ets/utils/api_config&";
// 登录页面 - NavDestination子页面，登录/注册合一
export function SignDestination(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SignDestinationComponent(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Sign.ets", line: 13, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SignDestinationComponent" });
    }
}
export class SignDestinationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__form = new ObservedPropertyObjectPU({ uname: '', password: '' }, this, "form");
        this.__loading = new ObservedPropertySimplePU(false, this, "loading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SignDestinationComponent_Params) {
        if (params.form !== undefined) {
            this.form = params.form;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
    }
    updateStateVars(params: SignDestinationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__form.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__form.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
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
    private __form: ObservedPropertyObjectPU<SignForm>;
    get form() {
        return this.__form.get();
    }
    set form(newValue: SignForm) {
        this.__form.set(newValue);
    }
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    async signIn(): Promise<void> {
        if (!this.form.uname || !this.form.password) {
            toast.error('请输入账号和密码');
            return;
        }
        // 验证输入格式
        if (this.form.uname.length < 3) {
            toast.error('账号长度至少3个字符');
            return;
        }
        if (this.form.password.length < 6) {
            toast.error('密码长度至少6个字符');
            return;
        }
        this.loading = true;
        try {
            let res: SignResponse;
            if (use_mock) {
                // Mock模式
                await new Promise<void>((resolve: Function) => { setTimeout(resolve, 800); });
                res = mockLogin(this.form.uname, this.form.password);
            }
            else {
                // 使用后端服务
                res = await request.post(API.AUTH.LOGIN, this.form) as SignResponse;
            }
            this.loading = false;
            if (res.code === 200) {
                // 保存token和用户名
                await storage.set('token', res.data as string);
                await storage.set('uname', this.form.uname);
                // 更新AppStorage，让MineBar等组件实时响应登录状态变化
                AppStorage.setOrCreate('isLoggedIn', true);
                AppStorage.setOrCreate('uname', this.form.uname);
                toast.success('登录成功');
                // 清空导航栈，返回首页
                this.navPathStack.clear();
            }
            else {
                toast.error(res.msg || '登录失败');
            }
        }
        catch (err) {
            this.loading = false;
            console.error('登录异常:', JSON.stringify(err));
            toast.error('网络错误，请稍后重试');
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Sign.ets(73:7)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部返回按钮
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Sign.ets(75:9)", "entry");
                    // 顶部返回按钮
                    Row.width('100%');
                    // 顶部返回按钮
                    Row.height(56);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125830087, "type": 20000, params: [], "bundleName": "com.example.endapp", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/Sign.ets(76:11)", "entry");
                    Image.width(28);
                    Image.height(28);
                    Image.fillColor('#666666');
                    Image.margin({ left: 16, top: 12 });
                    Image.onClick(() => {
                        this.navPathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                    Blank.debugLine("entry/src/main/ets/pages/Sign.ets(84:11)", "entry");
                }, Blank);
                Blank.pop();
                // 顶部返回按钮
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 主内容区域
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Sign.ets(90:9)", "entry");
                    // 主内容区域
                    Column.width('100%');
                    // 主内容区域
                    Column.height('100%');
                    // 主内容区域
                    Column.justifyContent(FlexAlign.Start);
                    // 主内容区域
                    Column.linearGradient({
                        direction: GradientDirection.Top,
                        angle: 180,
                        colors: [[0xe9e5fb, 0.0], [0xffffff, 0.4], [0xffffff, 1.0]]
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Logo区域
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Sign.ets(92:11)", "entry");
                    // Logo区域
                    Column.height(200);
                    // Logo区域
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('🖼️');
                    Text.debugLine("entry/src/main/ets/pages/Sign.ets(93:13)", "entry");
                    Text.fontSize(52);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('壁纸小屋');
                    Text.debugLine("entry/src/main/ets/pages/Sign.ets(95:13)", "entry");
                    Text.fontSize(24);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                    Text.margin({ top: 14 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('发现美好，装点生活');
                    Text.debugLine("entry/src/main/ets/pages/Sign.ets(100:13)", "entry");
                    Text.fontSize(13);
                    Text.fontColor('#999999');
                    Text.margin({ top: 6 });
                }, Text);
                Text.pop();
                // Logo区域
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 账号输入
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Sign.ets(109:11)", "entry");
                    // 账号输入
                    Column.width('88%');
                    // 账号输入
                    Column.height(50);
                    // 账号输入
                    Column.backgroundColor('#ffffff');
                    // 账号输入
                    Column.borderRadius(12);
                    // 账号输入
                    Column.borderWidth(1.5);
                    // 账号输入
                    Column.borderColor('#a794ff');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ text: this.form.uname, placeholder: '请输入账号' });
                    TextInput.debugLine("entry/src/main/ets/pages/Sign.ets(110:13)", "entry");
                    TextInput.placeholderFont({ size: 14, weight: 400 });
                    TextInput.caretColor('#a794ff');
                    TextInput.width('100%');
                    TextInput.height('100%');
                    TextInput.fontSize(15);
                    TextInput.fontColor('#333333');
                    TextInput.backgroundColor('#ffffff');
                    TextInput.onChange((value: string) => {
                        this.form.uname = value;
                    });
                }, TextInput);
                // 账号输入
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 密码输入
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Sign.ets(130:11)", "entry");
                    // 密码输入
                    Column.width('88%');
                    // 密码输入
                    Column.height(50);
                    // 密码输入
                    Column.backgroundColor('#ffffff');
                    // 密码输入
                    Column.borderRadius(12);
                    // 密码输入
                    Column.borderWidth(1.5);
                    // 密码输入
                    Column.margin({ top: 18 });
                    // 密码输入
                    Column.borderColor('#a794ff');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ text: this.form.password, placeholder: '请输入密码' });
                    TextInput.debugLine("entry/src/main/ets/pages/Sign.ets(131:13)", "entry");
                    TextInput.placeholderFont({ size: 14, weight: 400 });
                    TextInput.caretColor('#a794ff');
                    TextInput.type(InputType.Password);
                    TextInput.showPasswordIcon(false);
                    TextInput.width('100%');
                    TextInput.height('100%');
                    TextInput.fontSize(15);
                    TextInput.fontColor('#333333');
                    TextInput.backgroundColor('#ffffff');
                    TextInput.onChange((value: string) => {
                        this.form.password = value;
                    });
                }, TextInput);
                // 密码输入
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 登录按钮
                    Button.createWithChild({ type: ButtonType.Capsule, stateEffect: true });
                    Button.debugLine("entry/src/main/ets/pages/Sign.ets(154:11)", "entry");
                    // 登录按钮
                    Button.backgroundColor('#a794ff');
                    // 登录按钮
                    Button.width('88%');
                    // 登录按钮
                    Button.margin({ top: 36 });
                    // 登录按钮
                    Button.onClick(() => {
                        this.signIn();
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Sign.ets(155:13)", "entry");
                    Row.alignItems(VerticalAlign.Center);
                    Row.height(46);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.loading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.debugLine("entry/src/main/ets/pages/Sign.ets(157:17)", "entry");
                                LoadingProgress.width(22);
                                LoadingProgress.height(22);
                                LoadingProgress.color(Color.White);
                                LoadingProgress.margin({ left: 10 });
                            }, LoadingProgress);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('登录 / 注册');
                    Text.debugLine("entry/src/main/ets/pages/Sign.ets(163:15)", "entry");
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.margin({ left: 6 });
                }, Text);
                Text.pop();
                Row.pop();
                // 登录按钮
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 提示文字
                    Text.create('首次使用将自动注册账号');
                    Text.debugLine("entry/src/main/ets/pages/Sign.ets(179:11)", "entry");
                    // 提示文字
                    Text.fontSize(11);
                    // 提示文字
                    Text.fontColor('#cccccc');
                    // 提示文字
                    Text.margin({ top: 16 });
                }, Text);
                // 提示文字
                Text.pop();
                // 主内容区域
                Column.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Sign" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#ffffff');
            NavDestination.debugLine("entry/src/main/ets/pages/Sign.ets(72:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
