if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SetWallpaperDestinationComponent_Params {
    navPathStack?: NavPathStack;
    currentItem?: WallpaperItem;
    isLiked?: number;
    loading?: boolean;
    dialogController?: CustomDialogController;
}
interface SetWallpaperDialog_Params {
    controller?: CustomDialogController;
    currentItem?: WallpaperItem;
}
import { mockWallpapers } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import type { WallpaperItem } from '../interface/index';
import { toast } from "@normalized:N&&&entry/src/main/ets/component/ShowToast&";
class SetWallpaperDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.currentItem = { id: '', title: '', url_type: 1, url: '', is_checked: false };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SetWallpaperDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentItem !== undefined) {
            this.currentItem = params.currentItem;
        }
    }
    updateStateVars(params: SetWallpaperDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private currentItem: WallpaperItem;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(14:5)", "entry");
            Column.backgroundColor('#ffffff');
            Column.borderRadius(14);
            Column.padding({ top: 25, bottom: 20 });
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置壁纸');
            Text.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(15:7)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(20:7)", "entry");
            Button.width('100%');
            Button.height(50);
            Button.backgroundColor('#ffffff');
            Button.onClick(() => {
                toast.success('已设为锁屏壁纸');
                this.controller.close();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('应用锁屏');
            Text.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(21:9)", "entry");
            Text.fontColor('#333333');
            Text.width('90%');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(31:7)", "entry");
            Button.width('100%');
            Button.height(50);
            Button.backgroundColor('#ffffff');
            Button.onClick(() => {
                toast.success('已设为桌面壁纸');
                this.controller.close();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('应用桌面');
            Text.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(32:9)", "entry");
            Text.fontColor('#333333');
            Text.width('90%');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(42:7)", "entry");
            Button.width('100%');
            Button.height(50);
            Button.backgroundColor('#ffffff');
            Button.onClick(() => {
                toast.success('已设为锁屏+桌面壁纸');
                this.controller.close();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('应用全部');
            Text.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(43:9)", "entry");
            Text.fontColor('#333333');
            Text.width('90%');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(53:7)", "entry");
            Button.backgroundColor('#eeeeee');
            Button.width('90%');
            Button.height(40);
            Button.margin({ top: 15 });
            Button.fontColor('#333333');
            Button.onClick(() => {
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function SetWallpaperDestination(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SetWallpaperDestinationComponent(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SetWallpaper.ets", line: 72, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SetWallpaperDestinationComponent" });
    }
}
class SetWallpaperDestinationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__currentItem = new ObservedPropertyObjectPU({ id: '', title: '', url_type: 1, url: '', is_checked: false }, this, "currentItem");
        this.__isLiked = new ObservedPropertySimplePU(0, this, "isLiked");
        this.__loading = new ObservedPropertySimplePU(true, this, "loading");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SetWallpaperDialog(this, { currentItem: this.currentItem }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/SetWallpaper.ets", line: 83, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        currentItem: this.currentItem
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 },
            autoCancel: true,
            customStyle: true
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SetWallpaperDestinationComponent_Params) {
        if (params.currentItem !== undefined) {
            this.currentItem = params.currentItem;
        }
        if (params.isLiked !== undefined) {
            this.isLiked = params.isLiked;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: SetWallpaperDestinationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentItem.purgeDependencyOnElmtId(rmElmtId);
        this.__isLiked.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__currentItem.aboutToBeDeleted();
        this.__isLiked.aboutToBeDeleted();
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
    private __currentItem: ObservedPropertyObjectPU<WallpaperItem>;
    get currentItem() {
        return this.__currentItem.get();
    }
    set currentItem(newValue: WallpaperItem) {
        this.__currentItem.set(newValue);
    }
    private __isLiked: ObservedPropertySimplePU<number>;
    get isLiked() {
        return this.__isLiked.get();
    }
    set isLiked(newValue: number) {
        this.__isLiked.set(newValue);
    }
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    private dialogController: CustomDialogController;
    aboutToAppear(): void {
        // 简化处理 - 从Mock数据加载默认壁纸
        this.loading = true;
        const found = mockWallpapers.length > 0 ? mockWallpapers[0] : undefined;
        if (found) {
            this.currentItem = found;
        }
        this.loading = false;
    }
    async handleCollect(): Promise<void> {
        this.isLiked = this.isLiked === 0 ? 1 : 0;
        toast.info(this.isLiked ? '已收藏' : '已取消收藏');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                    Stack.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(107:7)", "entry");
                    Stack.width('100%');
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 全屏壁纸预览
                    Image.create(this.currentItem.url);
                    Image.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(109:9)", "entry");
                    // 全屏壁纸预览
                    Image.width('100%');
                    // 全屏壁纸预览
                    Image.height('100%');
                    // 全屏壁纸预览
                    Image.objectFit(ImageFit.Cover);
                    // 全屏壁纸预览
                    Image.onComplete(() => {
                        this.loading = false;
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 返回按钮
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(118:9)", "entry");
                    // 返回按钮
                    Row.width('100%');
                    // 返回按钮
                    Row.height(56);
                    // 返回按钮
                    Row.position({ x: 0, y: 0 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125830087, "type": 20000, params: [], "bundleName": "com.example.endapp", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(119:11)", "entry");
                    Image.width(24);
                    Image.height(24);
                    Image.fillColor(Color.White);
                    Image.margin({ left: 12 });
                    Image.onClick(() => {
                        this.navPathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                    Blank.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(127:11)", "entry");
                }, Blank);
                Blank.pop();
                // 返回按钮
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 底部操作栏
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(134:9)", "entry");
                    // 底部操作栏
                    Row.width('90%');
                    // 底部操作栏
                    Row.position({ x: '5%', y: '90%' });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 收藏按钮
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(136:11)", "entry");
                    // 收藏按钮
                    Row.width(44);
                    // 收藏按钮
                    Row.height(44);
                    // 收藏按钮
                    Row.borderRadius(22);
                    // 收藏按钮
                    Row.backgroundColor('rgba(0,0,0,0.3)');
                    // 收藏按钮
                    Row.justifyContent(FlexAlign.Center);
                    // 收藏按钮
                    Row.onClick(() => {
                        this.handleCollect();
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.isLiked === 0 ? '🤍' : '❤️');
                    Text.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(137:13)", "entry");
                    Text.fontSize(22);
                }, Text);
                Text.pop();
                // 收藏按钮
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 应用壁纸按钮
                    Button.createWithLabel('应用壁纸', { type: ButtonType.Capsule, stateEffect: true });
                    Button.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(150:11)", "entry");
                    // 应用壁纸按钮
                    Button.backgroundColor(Color.White);
                    // 应用壁纸按钮
                    Button.fontColor('#333333');
                    // 应用壁纸按钮
                    Button.layoutWeight(1);
                    // 应用壁纸按钮
                    Button.margin({ left: 12 });
                    // 应用壁纸按钮
                    Button.onClick(() => {
                        if (this.dialogController !== undefined) {
                            this.dialogController.open();
                        }
                    });
                }, Button);
                // 应用壁纸按钮
                Button.pop();
                // 底部操作栏
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载中
                    if (this.loading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create();
                                Stack.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(166:11)", "entry");
                                Stack.width('100%');
                                Stack.height('100%');
                                Stack.backgroundColor('rgba(0,0,0,0.3)');
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(167:13)", "entry");
                                LoadingProgress.width(40);
                                LoadingProgress.height(40);
                                LoadingProgress.color('#a794ff');
                            }, LoadingProgress);
                            Stack.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/SetWallpaper" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#000000');
            NavDestination.debugLine("entry/src/main/ets/pages/SetWallpaper.ets(106:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
