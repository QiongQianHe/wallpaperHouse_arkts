if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WallpaperDestinationComponent_Params {
    navPathStack?: NavPathStack;
    list?: WallpaperItem[];
    page?: PageQuery;
    loading?: boolean;
    isLoad?: boolean;
    isPull?: boolean;
    isEnd?: boolean;
    hei?: number;
    pullText?: string;
    typeId?: string;
    title?: string;
    scroller?: Scroller;
}
import { mockWallpapers } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import type { WallpaperItem, PageQuery } from '../interface/index';
import { NoData } from "@normalized:N&&&entry/src/main/ets/component/NoData&";
import { PullDown, PullUp, InEnd } from "@normalized:N&&&entry/src/main/ets/component/ToLoad&";
// 壁纸分类列表 - NavDestination子页面
export function WallpaperDestination(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new WallpaperDestinationComponent(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Wallpaper.ets", line: 11, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "WallpaperDestinationComponent" });
    }
}
export class WallpaperDestinationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__list = new ObservedPropertyObjectPU([], this, "list");
        this.__page = new ObservedPropertyObjectPU({ offset: 1, limit: 10, count: 0 }, this, "page");
        this.__loading = new ObservedPropertySimplePU(false, this, "loading");
        this.__isLoad = new ObservedPropertySimplePU(false, this, "isLoad");
        this.__isPull = new ObservedPropertySimplePU(false, this, "isPull");
        this.__isEnd = new ObservedPropertySimplePU(false, this, "isEnd");
        this.__hei = new ObservedPropertySimplePU(25, this, "hei");
        this.__pullText = new ObservedPropertySimplePU('松开刷新', this, "pullText");
        this.__typeId = new ObservedPropertySimplePU('', this, "typeId");
        this.__title = new ObservedPropertySimplePU('壁纸中心', this, "title");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WallpaperDestinationComponent_Params) {
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.page !== undefined) {
            this.page = params.page;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
        if (params.isLoad !== undefined) {
            this.isLoad = params.isLoad;
        }
        if (params.isPull !== undefined) {
            this.isPull = params.isPull;
        }
        if (params.isEnd !== undefined) {
            this.isEnd = params.isEnd;
        }
        if (params.hei !== undefined) {
            this.hei = params.hei;
        }
        if (params.pullText !== undefined) {
            this.pullText = params.pullText;
        }
        if (params.typeId !== undefined) {
            this.typeId = params.typeId;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: WallpaperDestinationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__list.purgeDependencyOnElmtId(rmElmtId);
        this.__page.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoad.purgeDependencyOnElmtId(rmElmtId);
        this.__isPull.purgeDependencyOnElmtId(rmElmtId);
        this.__isEnd.purgeDependencyOnElmtId(rmElmtId);
        this.__hei.purgeDependencyOnElmtId(rmElmtId);
        this.__pullText.purgeDependencyOnElmtId(rmElmtId);
        this.__typeId.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__list.aboutToBeDeleted();
        this.__page.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
        this.__isLoad.aboutToBeDeleted();
        this.__isPull.aboutToBeDeleted();
        this.__isEnd.aboutToBeDeleted();
        this.__hei.aboutToBeDeleted();
        this.__pullText.aboutToBeDeleted();
        this.__typeId.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
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
    private __list: ObservedPropertyObjectPU<WallpaperItem[]>;
    get list() {
        return this.__list.get();
    }
    set list(newValue: WallpaperItem[]) {
        this.__list.set(newValue);
    }
    private __page: ObservedPropertyObjectPU<PageQuery>;
    get page() {
        return this.__page.get();
    }
    set page(newValue: PageQuery) {
        this.__page.set(newValue);
    }
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    private __isLoad: ObservedPropertySimplePU<boolean>;
    get isLoad() {
        return this.__isLoad.get();
    }
    set isLoad(newValue: boolean) {
        this.__isLoad.set(newValue);
    }
    private __isPull: ObservedPropertySimplePU<boolean>;
    get isPull() {
        return this.__isPull.get();
    }
    set isPull(newValue: boolean) {
        this.__isPull.set(newValue);
    }
    private __isEnd: ObservedPropertySimplePU<boolean>;
    get isEnd() {
        return this.__isEnd.get();
    }
    set isEnd(newValue: boolean) {
        this.__isEnd.set(newValue);
    }
    private __hei: ObservedPropertySimplePU<number>;
    get hei() {
        return this.__hei.get();
    }
    set hei(newValue: number) {
        this.__hei.set(newValue);
    }
    private __pullText: ObservedPropertySimplePU<string>;
    get pullText() {
        return this.__pullText.get();
    }
    set pullText(newValue: string) {
        this.__pullText.set(newValue);
    }
    private __typeId: ObservedPropertySimplePU<string>;
    get typeId() {
        return this.__typeId.get();
    }
    set typeId(newValue: string) {
        this.__typeId.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private scroller: Scroller;
    aboutToAppear(): void {
        this.getWallpapers(true);
    }
    // 通过navPathStack参数获取 - 简化处理，使用Mock数据
    onPageShow(): void {
        // 从首页传来的分类信息暂存于路由
    }
    async getWallpapers(flag: boolean = false): Promise<void> {
        if (flag) {
            this.loading = true;
        }
        // Mock数据 - 模拟网络延迟
        await new Promise<void>((resolve: Function) => { setTimeout(resolve, 500); });
        let rows = mockWallpapers;
        if (this.typeId) {
            rows = rows.filter(w => w.type_id === this.typeId);
        }
        this.loading = false;
        this.isLoad = false;
        if (this.isPull || flag) {
            this.list = rows;
            this.isPull = false;
            this.pullText = '松开刷新';
        }
        else {
            this.list = [...this.list, ...rows];
        }
        this.page.count = rows.length;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Wallpaper.ets(65:7)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部导航
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Wallpaper.ets(67:9)", "entry");
                    // 顶部导航
                    Row.width('100%');
                    // 顶部导航
                    Row.height(52);
                    // 顶部导航
                    Row.backgroundColor('#ffffff');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125830087, "type": 20000, params: [], "bundleName": "com.example.endapp", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/Wallpaper.ets(68:11)", "entry");
                    Image.width(24);
                    Image.height(24);
                    Image.fillColor('#333333');
                    Image.margin({ left: 16 });
                    Image.onClick(() => {
                        this.navPathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.title);
                    Text.debugLine("entry/src/main/ets/pages/Wallpaper.ets(77:11)", "entry");
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                    Text.textAlign(TextAlign.Center);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Wallpaper.ets(84:11)", "entry");
                    Row.width(24);
                    Row.height(24);
                    Row.margin({ right: 16 });
                }, Row);
                Row.pop();
                // 顶部导航
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 无数据
                    if (this.page.count === 0 && !this.loading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NoData(this, { type: 'empty', state: 0 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Wallpaper.ets", line: 92, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                type: 'empty',
                                                state: 0
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            type: 'empty', state: 0
                                        });
                                    }
                                }, { name: "NoData" });
                            }
                        });
                    }
                    // 下拉刷新
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 下拉刷新
                    if (this.isPull) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new PullDown(this, { hei: this.hei, pullText: this.pullText }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Wallpaper.ets", line: 97, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                hei: this.hei,
                                                pullText: this.pullText
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            hei: this.hei, pullText: this.pullText
                                        });
                                    }
                                }, { name: "PullDown" });
                            }
                        });
                    }
                    // 壁纸网格
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 壁纸网格
                    Scroll.create(this.scroller);
                    Scroll.debugLine("entry/src/main/ets/pages/Wallpaper.ets(101:9)", "entry");
                    // 壁纸网格
                    Scroll.scrollBar(BarState.Off);
                    // 壁纸网格
                    Scroll.edgeEffect(EdgeEffect.Spring);
                    // 壁纸网格
                    Scroll.width('100%');
                    // 壁纸网格
                    Scroll.layoutWeight(1);
                    // 壁纸网格
                    Scroll.onDidScroll(() => {
                        const y = this.scroller.currentOffset().yOffset;
                        if (y > 0)
                            return;
                        this.pullText = '松开刷新';
                        const scrollY = Math.floor(Math.abs(y));
                        if (scrollY > 24) {
                            this.isPull = true;
                            this.hei = scrollY;
                        }
                    });
                    // 壁纸网格
                    Scroll.onScrollStop(() => {
                        if (this.isPull) {
                            this.pullText = '刷新中';
                            this.page.offset = 1;
                            this.getWallpapers();
                        }
                    });
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Wallpaper.ets(102:11)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.debugLine("entry/src/main/ets/pages/Wallpaper.ets(103:13)", "entry");
                    Grid.columnsTemplate('1fr 1fr');
                    Grid.columnsGap(10);
                    Grid.rowsGap(10);
                    Grid.width('90%');
                }, Grid);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                                GridItem.width('48%');
                                GridItem.margin({ bottom: 18 });
                                GridItem.debugLine("entry/src/main/ets/pages/Wallpaper.ets(105:17)", "entry");
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/Wallpaper.ets(106:19)", "entry");
                                    Column.alignItems(HorizontalAlign.Start);
                                    Column.onClick(() => {
                                        this.navPathStack.pushPathByName('SetWallpaper', undefined);
                                    });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(item.url);
                                    Image.debugLine("entry/src/main/ets/pages/Wallpaper.ets(107:21)", "entry");
                                    Image.width('100%');
                                    Image.height(320);
                                    Image.borderRadius(10);
                                    Image.backgroundColor(item.color);
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                    Text.debugLine("entry/src/main/ets/pages/Wallpaper.ets(112:21)", "entry");
                                    Text.fontSize(14);
                                    Text.margin({ top: 10, left: 5 });
                                    Text.fontColor('#333333');
                                }, Text);
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.list, forEachItemGenFunction, (item: WallpaperItem) => item.id, false, false);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isLoad) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new PullUp(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Wallpaper.ets", line: 132, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "PullUp" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isEnd) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new InEnd(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Wallpaper.ets", line: 135, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "InEnd" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
                // 壁纸网格
                Scroll.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载中
                    if (this.loading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create();
                                Stack.debugLine("entry/src/main/ets/pages/Wallpaper.ets(163:11)", "entry");
                                Stack.width('100%');
                                Stack.height('100%');
                                Stack.backgroundColor('rgba(255,255,255,0.85)');
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("entry/src/main/ets/pages/Wallpaper.ets(164:13)", "entry");
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.debugLine("entry/src/main/ets/pages/Wallpaper.ets(165:15)", "entry");
                                LoadingProgress.width(36);
                                LoadingProgress.height(36);
                                LoadingProgress.color('#a794ff');
                            }, LoadingProgress);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('加载中...');
                                Text.debugLine("entry/src/main/ets/pages/Wallpaper.ets(169:15)", "entry");
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                                Text.margin({ top: 8 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            Stack.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Wallpaper" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#f5f5f5');
            NavDestination.debugLine("entry/src/main/ets/pages/Wallpaper.ets(64:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WallpaperDestinationComponent";
    }
}
registerNamedRoute(() => new WallpaperDestinationComponent(undefined, {}), "", { bundleName: "com.example.endapp", moduleName: "entry", pagePath: "pages/Wallpaper", pageFullPath: "entry/src/main/ets/pages/Wallpaper", integratedHsp: "false", moduleType: "followWithHap" });
