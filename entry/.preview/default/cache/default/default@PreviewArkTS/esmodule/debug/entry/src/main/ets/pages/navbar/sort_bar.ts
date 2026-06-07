if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SortBar_Params {
    navPathStack?: NavPathStack;
    categories?: CategoryItem[];
    location?: string;
}
import { mockCategories } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import type { CategoryItem } from '../../interface/index';
// 分类Tab - 壁纸分类网格，支持定位导航
export function SortBarBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SortBar(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/navbar/sort_bar.ets", line: 9, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SortBar" });
    }
}
export class SortBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__categories = new ObservedPropertyObjectPU(mockCategories, this, "categories");
        this.__location = new ObservedPropertySimplePU('获取中...', this, "location");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SortBar_Params) {
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
        if (params.location !== undefined) {
            this.location = params.location;
        }
    }
    updateStateVars(params: SortBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__categories.purgeDependencyOnElmtId(rmElmtId);
        this.__location.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__categories.aboutToBeDeleted();
        this.__location.aboutToBeDeleted();
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
    private __categories: ObservedPropertyObjectPU<CategoryItem[]>;
    get categories() {
        return this.__categories.get();
    }
    set categories(newValue: CategoryItem[]) {
        this.__categories.set(newValue);
    }
    private __location: ObservedPropertySimplePU<string>;
    get location() {
        return this.__location.get();
    }
    set location(newValue: string) {
        this.__location.set(newValue);
    }
    aboutToAppear(): void {
        this.getLocation();
    }
    async getLocation(): Promise<void> {
        // 模拟定位数据 - 模拟器上 geoLocationManager 可能不可用
        this.location = '当前位置: 正在获取...';
        await new Promise<void>((resolve: Function) => { setTimeout(resolve, 1000); });
        this.location = '📍 定位服务 (演示功能)';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(30:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(31:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 定位导航提示
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(33:9)", "entry");
            // 定位导航提示
            Row.width('100%');
            // 定位导航提示
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
            // 定位导航提示
            Row.backgroundColor('#f0edff');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📍');
            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(34:11)", "entry");
            Text.fontSize(16);
            Text.margin({ right: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.location);
            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(38:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        // 定位导航提示
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类标题
            Text.create('📂 壁纸分类');
            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(49:9)", "entry");
            // 分类标题
            Text.fontSize(18);
            // 分类标题
            Text.fontWeight(FontWeight.Bold);
            // 分类标题
            Text.fontColor('#333333');
            // 分类标题
            Text.width('100%');
            // 分类标题
            Text.padding({ left: 16, right: 16, top: 16, bottom: 12 });
        }, Text);
        // 分类标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类网格
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(57:9)", "entry");
            // 分类网格
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            // 分类网格
            Grid.columnsGap(8);
            // 分类网格
            Grid.rowsGap(8);
            // 分类网格
            Grid.width('100%');
            // 分类网格
            Grid.padding({ left: 16, right: 16 });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.width('100%');
                        GridItem.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(59:13)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(60:15)", "entry");
                            Column.width('100%');
                            Column.height(100);
                            Column.justifyContent(FlexAlign.Center);
                            Column.borderRadius(12);
                            Column.backgroundColor(Color.White);
                            Column.shadow({ radius: 6, color: 'rgba(0,0,0,0.04)', offsetX: 0, offsetY: 1 });
                            Column.onClick(() => {
                                this.navPathStack.pushPathByName('Wallpaper', undefined);
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.icon);
                            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(61:17)", "entry");
                            Text.fontSize(32);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(63:17)", "entry");
                            Text.fontSize(13);
                            Text.fontWeight(FontWeight.Medium);
                            Text.fontColor('#333333');
                            Text.margin({ top: 6 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`${item.count}张`);
                            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(68:17)", "entry");
                            Text.fontSize(11);
                            Text.fontColor('#999999');
                            Text.margin({ top: 2 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (item: CategoryItem) => item.id, true, false);
        }, ForEach);
        ForEach.pop();
        // 分类网格
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Footer栏
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(93:9)", "entry");
            // Footer栏
            Column.width('100%');
            // Footer栏
            Column.padding({ top: 30, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('壁纸小屋 v1.0.1');
            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(94:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#cccccc');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Copyright © 2026 Wallpaper House');
            Text.debugLine("entry/src/main/ets/pages/navbar/sort_bar.ets(97:11)", "entry");
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
