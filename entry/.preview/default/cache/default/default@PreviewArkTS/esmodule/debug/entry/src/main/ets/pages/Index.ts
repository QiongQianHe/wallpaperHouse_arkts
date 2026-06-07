if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    navPathStack?: NavPathStack;
    currentIndex?: number;
    isLoggedIn?: boolean;
    userName?: string;
}
import { HomeBarBuilder } from "@normalized:N&&&entry/src/main/ets/pages/navbar/home_bar&";
import { SortBarBuilder } from "@normalized:N&&&entry/src/main/ets/pages/navbar/sort_bar&";
import { MineBarBuilder } from "@normalized:N&&&entry/src/main/ets/pages/navbar/mine_bar&";
import { SignDestination } from "@normalized:N&&&entry/src/main/ets/pages/Sign&";
import { WallpaperDestination } from "@normalized:N&&&entry/src/main/ets/pages/Wallpaper&";
import { SetWallpaperDestination } from "@normalized:N&&&entry/src/main/ets/pages/SetWallpaper&";
import { WatermarkDestination } from "@normalized:N&&&entry/src/main/ets/pages/Watermark&";
import { MineDetailDestination } from "@normalized:N&&&entry/src/main/ets/pages/MineDetail&";
import { app_name, use_mock } from "@normalized:N&&&entry/src/main/ets/utils/env&";
import { initMockData } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import storage from "@normalized:N&&&entry/src/main/ets/utils/storage&";
import type common from "@ohos:app.ability.common";
import { NetworkDiagnostic } from "@normalized:N&&&entry/src/main/ets/utils/network_diagnostic&";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "navPathStack");
        this.addProvidedVar("navPathStack", this.__navPathStack, false);
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__isLoggedIn = new ObservedPropertySimplePU(false, this, "isLoggedIn");
        this.__userName = new ObservedPropertySimplePU('未登录', this, "userName");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.navPathStack !== undefined) {
            this.navPathStack = params.navPathStack;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.isLoggedIn !== undefined) {
            this.isLoggedIn = params.isLoggedIn;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
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
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __isLoggedIn: ObservedPropertySimplePU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        // 初始化Mock数据和缓存
        initMockData();
        // 获取上下文并初始化存储
        const context = getContext(this) as common.UIAbilityContext;
        await storage.init(context);
        // 网络诊断（仅开发环境）
        if (!use_mock) {
            NetworkDiagnostic.checkConfig();
        }
        const token = await storage.get('token');
        this.isLoggedIn = token !== '';
        AppStorage.setOrCreate('navPathStack', this.navPathStack);
        await this.checkLoginStatus();
    }
    // 生命周期方法
    async onPageShow(): Promise<void> {
        await this.checkLoginStatus();
    }
    async checkLoginStatus(): Promise<void> {
        const token = await storage.get('token');
        this.isLoggedIn = token !== '';
        if (this.isLoggedIn) {
            const uname = await storage.get('uname');
            this.userName = uname || '用户';
        }
        else {
            this.userName = '未登录';
        }
        console.info('登录状态更新：', this.isLoggedIn, this.userName);
    }
    PagesMap(name: string, param: object, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'Sign') {
                this.ifElseBranchUpdateFunction(0, () => {
                    SignDestination.bind(this)();
                });
            }
            else if (name === 'Wallpaper') {
                this.ifElseBranchUpdateFunction(1, () => {
                    WallpaperDestination.bind(this)();
                });
            }
            else if (name === 'SetWallpaper') {
                this.ifElseBranchUpdateFunction(2, () => {
                    SetWallpaperDestination.bind(this)();
                });
            }
            else if (name === 'Watermark') {
                this.ifElseBranchUpdateFunction(3, () => {
                    WatermarkDestination.bind(this)();
                });
            }
            else if (name === 'MineDetail') {
                this.ifElseBranchUpdateFunction(4, () => {
                    MineDetailDestination.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(5, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.navPathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.debugLine("entry/src/main/ets/pages/Index.ets(76:5)", "entry");
            Navigation.mode(NavigationMode.Stack);
            Navigation.navDestination({ builder: this.PagesMap.bind(this) });
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(77:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f5f5f5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(79:9)", "entry");
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(52);
            // 顶部导航栏
            Row.backgroundColor('#ffffff');
            // 顶部导航栏
            Row.padding({ left: 16, right: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(app_name);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(80:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔍');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(86:11)", "entry");
            Text.fontSize(22);
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Tab 内容区域（占据剩余空间）
            Tabs.create({ index: this.currentIndex });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(96:9)", "entry");
            // Tab 内容区域（占据剩余空间）
            Tabs.barPosition(BarPosition.End);
            // Tab 内容区域（占据剩余空间）
            Tabs.barMode(BarMode.Fixed);
            // Tab 内容区域（占据剩余空间）
            Tabs.barHeight(56);
            // Tab 内容区域（占据剩余空间）
            Tabs.barBackgroundColor('#ffffff');
            // Tab 内容区域（占据剩余空间）
            Tabs.onChange((index: number) => {
                this.currentIndex = index;
            });
            // Tab 内容区域（占据剩余空间）
            Tabs.layoutWeight(1);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                HomeBarBuilder.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '🏠', '首页', 0);
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(97:11)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                SortBarBuilder.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '📂', '分类', 1);
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(102:11)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                MineBarBuilder.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '👤', '我的', 2);
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(107:11)", "entry");
        }, TabContent);
        TabContent.pop();
        // Tab 内容区域（占据剩余空间）
        Tabs.pop();
        Column.pop();
        Navigation.pop();
    }
    TabBarItem(icon: string, title: string, idx: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(133:5)", "entry");
            Column.justifyContent(FlexAlign.Center);
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(134:7)", "entry");
            Text.fontSize(22);
            Text.opacity(this.currentIndex === idx ? 1 : 0.45);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(137:7)", "entry");
            Text.fontSize(11);
            Text.fontColor(this.currentIndex === idx ? '#a794ff' : '#999999');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.endapp", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
