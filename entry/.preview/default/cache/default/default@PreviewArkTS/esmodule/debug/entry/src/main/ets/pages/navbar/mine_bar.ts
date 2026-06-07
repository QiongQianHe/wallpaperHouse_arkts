if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineBarPreview_Params {
    navPathStack?: NavPathStack;
}
interface MineBar_Params {
    navPathStack?: NavPathStack;
    avatar?: string;
    uname?: string;
    isLoggedIn?: boolean;
    operateList?: OperateItem[];
}
import type { OperateItem } from '../../interface/index';
import { mockUserInfo } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import { toast } from "@normalized:N&&&entry/src/main/ets/component/ShowToast&";
import storage from "@normalized:N&&&entry/src/main/ets/utils/storage&";
// 我的Tab - 用户中心
export function MineBarBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MineBar(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/navbar/mine_bar.ets", line: 10, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MineBar" });
    }
}
class MineBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__avatar = new ObservedPropertySimplePU(mockUserInfo.avatar
        // 使用 @StorageLink 实现跨组件响应式更新，登录成功后无需重建组件即可自动刷新
        , this, "avatar");
        this.__uname = this.createStorageLink('uname', mockUserInfo.uname, "uname");
        this.__isLoggedIn = this.createStorageLink('isLoggedIn', false, "isLoggedIn");
        this.__operateList = new ObservedPropertyObjectPU([
            {
                icon: '🖼️',
                title: '我的壁纸',
                routeName: 'MineDetail',
                params: undefined
            },
            {
                icon: '❤️',
                title: '我的收藏',
                routeName: 'MineDetail',
                params: undefined
            },
            {
                icon: '✏️',
                title: '个人信息',
                routeName: 'MineDetail',
                params: undefined
            },
            {
                icon: '📝',
                title: '图片水印',
                routeName: 'Watermark',
                params: undefined
            },
            {
                icon: 'ℹ️',
                title: '关于壁纸',
                routeName: 'MineDetail',
                params: undefined
            },
        ], this, "operateList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineBar_Params) {
        if (params.avatar !== undefined) {
            this.avatar = params.avatar;
        }
        if (params.operateList !== undefined) {
            this.operateList = params.operateList;
        }
    }
    updateStateVars(params: MineBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__avatar.purgeDependencyOnElmtId(rmElmtId);
        this.__uname.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
        this.__operateList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__avatar.aboutToBeDeleted();
        this.__uname.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        this.__operateList.aboutToBeDeleted();
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
    private __avatar: ObservedPropertySimplePU<string>;
    get avatar() {
        return this.__avatar.get();
    }
    set avatar(newValue: string) {
        this.__avatar.set(newValue);
    }
    // 使用 @StorageLink 实现跨组件响应式更新，登录成功后无需重建组件即可自动刷新
    private __uname: ObservedPropertyAbstractPU<string>;
    get uname() {
        return this.__uname.get();
    }
    set uname(newValue: string) {
        this.__uname.set(newValue);
    }
    private __isLoggedIn: ObservedPropertyAbstractPU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    private __operateList: ObservedPropertyObjectPU<OperateItem[]>;
    get operateList() {
        return this.__operateList.get();
    }
    set operateList(newValue: OperateItem[]) {
        this.__operateList.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        await this.refreshLoginStatus();
    }
    // 页面显示时刷新登录状态
    async onPageShow(): Promise<void> {
        await this.refreshLoginStatus();
    }
    async refreshLoginStatus(): Promise<void> {
        // 从存储中读取登录状态
        const token = await storage.get('token');
        this.isLoggedIn = token !== '';
        if (this.isLoggedIn) {
            // 已登录，获取保存的用户名
            const savedName = await storage.get('uname');
            if (savedName) {
                this.uname = savedName;
            }
        }
    }
    async logout(): Promise<void> {
        // 清除所有存储数据（包括token、用户名等）
        await storage.clear();
        this.isLoggedIn = false;
        this.uname = '未登录';
        toast.success('已退出登录');
        // 清空导航栈并跳转到登录页
        this.navPathStack.clear();
        this.navPathStack.pushPathByName('Sign', undefined);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(87:5)", "entry");
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(88:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户头像区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(90:9)", "entry");
            // 用户头像区域
            Column.width('100%');
            // 用户头像区域
            Column.padding({ top: 40, bottom: 20 });
            // 用户头像区域
            Column.backgroundColor('#ffffff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.avatar);
            Image.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(91:11)", "entry");
            Image.width(70);
            Image.height(70);
            Image.borderRadius(35);
            Image.border({ width: 3, color: '#a794ff' });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isLoggedIn ? this.uname : '未登录');
            Text.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(97:11)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isLoggedIn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('登录 / 注册');
                        Button.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(104:13)", "entry");
                        Button.fontSize(13);
                        Button.backgroundColor('#a794ff');
                        Button.fontColor(Color.White);
                        Button.borderRadius(20);
                        Button.height(36);
                        Button.margin({ top: 12 });
                        Button.onClick(() => {
                            this.navPathStack.pushPathByName('Sign', undefined);
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('退出登录');
                        Button.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(115:13)", "entry");
                        Button.fontSize(12);
                        Button.backgroundColor('#f0f0f0');
                        Button.fontColor('#999999');
                        Button.borderRadius(16);
                        Button.height(30);
                        Button.margin({ top: 8 });
                        Button.onClick(() => {
                            AlertDialog.show({
                                title: '提示',
                                message: '确定要退出登录吗？',
                                primaryButton: {
                                    value: '取消',
                                    action: () => {
                                        // 取消操作
                                    }
                                },
                                secondaryButton: {
                                    value: '确定',
                                    action: () => {
                                        this.logout();
                                    }
                                }
                            });
                        });
                    }, Button);
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        // 用户头像区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作列表
            List.create();
            List.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(147:9)", "entry");
            // 操作列表
            List.width('100%');
            // 操作列表
            List.margin({ top: 12 });
            // 操作列表
            List.divider({ strokeWidth: 0.5, color: '#f0f0f0', startMargin: 52 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.onClick(() => {
                            this.navPathStack.pushPathByName(item.routeName, undefined);
                        });
                        ListItem.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(149:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(150:15)", "entry");
                            Row.width('100%');
                            Row.height(56);
                            Row.alignItems(VerticalAlign.Center);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.icon);
                            Text.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(151:17)", "entry");
                            Text.fontSize(22);
                            Text.margin({ left: 16 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(155:17)", "entry");
                            Text.fontSize(15);
                            Text.fontColor('#333333');
                            Text.layoutWeight(1);
                            Text.margin({ left: 12 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 125830088, "type": 20000, params: [], "bundleName": "com.example.endapp", "moduleName": "entry" });
                            Image.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(161:17)", "entry");
                            Image.width(20);
                            Image.height(20);
                            Image.fillColor('#cccccc');
                            Image.margin({ right: 16 });
                        }, Image);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.operateList, forEachItemGenFunction, (item: OperateItem) => item.title, true, false);
        }, ForEach);
        ForEach.pop();
        // 操作列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Footer栏
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(181:9)", "entry");
            // Footer栏
            Column.width('100%');
            // Footer栏
            Column.padding({ top: 30, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('壁纸小屋 v1.0.1');
            Text.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(182:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#cccccc');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Copyright © 2026 Wallpaper House');
            Text.debugLine("entry/src/main/ets/pages/navbar/mine_bar.ets(185:11)", "entry");
            Text.fontSize(10);
            Text.fontColor('#dddddd');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        // Footer栏
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class MineBarPreview extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "navPathStack");
        this.addProvidedVar("navPathStack", this.__navPathStack, false);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineBarPreview_Params) {
        if (params.navPathStack !== undefined) {
            this.navPathStack = params.navPathStack;
        }
    }
    updateStateVars(params: MineBarPreview_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navPathStack: ObservedPropertyObjectPU<NavPathStack>;
    get navPathStack() {
        return this.__navPathStack.get();
    }
    set navPathStack(newValue: NavPathStack) {
        this.__navPathStack.set(newValue);
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MineBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/navbar/mine_bar.ets", line: 204, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MineBar" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "MineBarPreview", new MineBarPreview(undefined, {}));
    previewComponent();
}
else {
}
