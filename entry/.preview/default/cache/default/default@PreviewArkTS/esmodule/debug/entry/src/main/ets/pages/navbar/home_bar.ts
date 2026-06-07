if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeBar_Params {
    navPathStack?: NavPathStack;
    banners?: BannerItem[];
    recommendList?: WallpaperItem[];
    swiperController?: SwiperController;
}
import { mockBanners, mockWallpapers } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import type { BannerItem, WallpaperItem } from '../../interface/index';
import { getRandomColor } from "@normalized:N&&&entry/src/main/ets/utils/tools&";
// 首页Tab - 轮播图 + 推荐壁纸
export function HomeBarBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new HomeBar(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/navbar/home_bar.ets", line: 9, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "HomeBar" });
    }
}
export class HomeBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__banners = new ObservedPropertyObjectPU([], this, "banners");
        this.__recommendList = new ObservedPropertyObjectPU([], this, "recommendList");
        this.swiperController = new SwiperController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeBar_Params) {
        if (params.banners !== undefined) {
            this.banners = params.banners;
        }
        if (params.recommendList !== undefined) {
            this.recommendList = params.recommendList;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    updateStateVars(params: HomeBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__banners.purgeDependencyOnElmtId(rmElmtId);
        this.__recommendList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__banners.aboutToBeDeleted();
        this.__recommendList.aboutToBeDeleted();
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
    private __banners: ObservedPropertyObjectPU<BannerItem[]>;
    get banners() {
        return this.__banners.get();
    }
    set banners(newValue: BannerItem[]) {
        this.__banners.set(newValue);
    }
    private __recommendList: ObservedPropertyObjectPU<WallpaperItem[]>;
    get recommendList() {
        return this.__recommendList.get();
    }
    set recommendList(newValue: WallpaperItem[]) {
        this.__recommendList.set(newValue);
    }
    private swiperController: SwiperController;
    aboutToAppear(): void {
        this.banners = mockBanners;
        let rows = mockWallpapers.slice(0, 6);
        let list: WallpaperItem[] = [];
        for (let i = 0; i < rows.length; i++) {
            let item: WallpaperItem = {
                id: rows[i].id,
                title: rows[i].title,
                url_type: rows[i].url_type,
                url: rows[i].url,
                is_checked: rows[i].is_checked,
                color: getRandomColor()
            };
            list.push(item);
        }
        this.recommendList = list;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(38:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(39:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 轮播图
            Swiper.create(this.swiperController);
            Swiper.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(41:9)", "entry");
            // 轮播图
            Swiper.autoPlay(true);
            // 轮播图
            Swiper.interval(3000);
            // 轮播图
            Swiper.loop(true);
            // 轮播图
            Swiper.indicator(new DotIndicator().color('#cccccc').selectedColor('#a794ff'));
            // 轮播图
            Swiper.width('100%');
            // 轮播图
            Swiper.height(220);
            // 轮播图
            Swiper.borderRadius(12);
            // 轮播图
            Swiper.margin({ top: 16, bottom: 8 });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(43:13)", "entry");
                    Stack.width('100%');
                    Stack.height(220);
                    Stack.borderRadius(12);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.url);
                    Image.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(44:15)", "entry");
                    Image.width('100%');
                    Image.height('100%');
                    Image.objectFit(ImageFit.Cover);
                    Image.borderRadius(12);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(50:15)", "entry");
                    Column.position({ x: '5%', y: '75%' });
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(51:17)", "entry");
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.desc);
                    Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(55:17)", "entry");
                    Text.fontSize(12);
                    Text.fontColor('rgba(255,255,255,0.8)');
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                Stack.pop();
            };
            this.forEachUpdateFunction(elmtId, this.banners, forEachItemGenFunction, (item: BannerItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        // 轮播图
        Swiper.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(77:9)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔥 推荐壁纸');
            Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(78:11)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(80:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('更多 >');
            Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(81:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#a794ff');
            Text.onClick(() => { this.navPathStack.pushPathByName('Wallpaper', undefined); });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(85:9)", "entry");
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.width('100%');
            Grid.padding({ left: 16, right: 16 });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.width('100%');
                        GridItem.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(87:13)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(88:15)", "entry");
                            Column.borderRadius(10);
                            Column.backgroundColor(Color.White);
                            Column.shadow({ radius: 8, color: 'rgba(0,0,0,0.05)', offsetX: 0, offsetY: 2 });
                            Column.onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined); });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.url);
                            Image.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(89:17)", "entry");
                            Image.width('100%');
                            Image.height(160);
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius({ topLeft: 10, topRight: 10 });
                            Image.backgroundColor(item.color);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(91:17)", "entry");
                            Text.fontSize(13);
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.padding({ left: 8, right: 8, top: 6, bottom: 6 });
                            Text.fontColor('#333333');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.recommendList, forEachItemGenFunction, (item: WallpaperItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(104:9)", "entry");
            Column.width('100%');
            Column.padding({ top: 30, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('壁纸小屋 v1.0.1');
            Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(105:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#cccccc');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Copyright © 2026 Wallpaper House');
            Text.debugLine("entry/src/main/ets/pages/navbar/home_bar.ets(106:11)", "entry");
            Text.fontSize(10);
            Text.fontColor('#dddddd');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
