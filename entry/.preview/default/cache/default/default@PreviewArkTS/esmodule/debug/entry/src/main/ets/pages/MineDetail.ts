if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineDetailDestinationComponent_Params {
    navPathStack?: NavPathStack;
    currentTab?: number;
    title?: string;
    wallpapers?: WallpaperItem[];
    collections?: CollectionItem[];
    userInfo?: UserInfoData;
    aboutLinks?: AboutLink[];
    loading?: boolean;
    uname?: string;
    dialogController?: CustomDialogController;
    tabTitles?: string[];
}
interface EditNameDialog_Params {
    controller?: CustomDialogController;
    uname?: string;
    inputText?: string;
}
import { mockWallpapers, mockCollections, mockUserInfo } from "@normalized:N&&&entry/src/main/ets/utils/data_source&";
import type { WallpaperItem, CollectionItem } from '../interface/index';
import { getRandomColor } from "@normalized:N&&&entry/src/main/ets/utils/tools&";
import { toast } from "@normalized:N&&&entry/src/main/ets/component/ShowToast&";
import { Loading } from "@normalized:N&&&entry/src/main/ets/component/Loading&";
// 关于链接类型
class AboutLink {
    title: string = '';
    url: string = '';
}
// 用户信息类型
class UserInfoData {
    avatar: string = '';
    uname: string = '';
    sex_tit: string = '';
    nation: string = '';
    reg_time: string = '';
}
class EditNameDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.__uname = new SynchedPropertySimpleTwoWayPU(params.uname, this, "uname");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditNameDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
    }
    updateStateVars(params: EditNameDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__uname.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__uname.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __uname: SynchedPropertySimpleTwoWayPU<string>;
    get uname() {
        return this.__uname.get();
    }
    set uname(newValue: string) {
        this.__uname.set(newValue);
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    aboutToAppear(): void {
        this.inputText = this.uname;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(33:5)", "entry");
            Column.backgroundColor(Color.White);
            Column.borderRadius(14);
            Column.padding({ top: 25, bottom: 20 });
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编辑昵称');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(34:7)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.inputText, placeholder: '请输入昵称' });
            TextInput.debugLine("entry/src/main/ets/pages/MineDetail.ets(35:7)", "entry");
            TextInput.width('90%');
            TextInput.height(46);
            TextInput.borderRadius(10);
            TextInput.fontSize(15);
            TextInput.margin({ top: 20, bottom: 20 });
            TextInput.onChange((value: string) => { this.inputText = value; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(39:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.debugLine("entry/src/main/ets/pages/MineDetail.ets(40:9)", "entry");
            Button.backgroundColor('#eeeeee');
            Button.fontColor('#333333');
            Button.width('42%');
            Button.height(42);
            Button.borderRadius(21);
            Button.onClick(() => { this.controller.close(); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.debugLine("entry/src/main/ets/pages/MineDetail.ets(43:9)", "entry");
            Button.backgroundColor('#a794ff');
            Button.fontColor(Color.White);
            Button.width('42%');
            Button.height(42);
            Button.borderRadius(21);
            Button.margin({ left: 12 });
            Button.onClick(() => {
                this.uname = this.inputText;
                toast.success('昵称已更新');
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// 我的详情页 - NavDestination
export function MineDetailDestination(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MineDetailDestinationComponent(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MineDetail.ets", line: 59, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MineDetailDestinationComponent" });
    }
}
export class MineDetailDestinationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPathStack = this.initializeConsume('navPathStack', "navPathStack");
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__title = new ObservedPropertySimplePU('我的壁纸', this, "title");
        this.__wallpapers = new ObservedPropertyObjectPU([], this, "wallpapers");
        this.__collections = new ObservedPropertyObjectPU([], this, "collections");
        this.__userInfo = new ObservedPropertyObjectPU(new UserInfoData(), this, "userInfo");
        this.__aboutLinks = new ObservedPropertyObjectPU([], this, "aboutLinks");
        this.__loading = new ObservedPropertySimplePU(false, this, "loading");
        this.__uname = new ObservedPropertySimplePU('壁纸爱好者', this, "uname");
        this.addProvidedVar("uname", this.__uname, false);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new EditNameDialog(this, { uname: this.__uname }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/MineDetail.ets", line: 74, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        uname: this.__uname
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -40 },
            autoCancel: true,
            customStyle: true
        }, this);
        this.tabTitles = ['我的壁纸', '我的收藏', '个人信息', '关于'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineDetailDestinationComponent_Params) {
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.wallpapers !== undefined) {
            this.wallpapers = params.wallpapers;
        }
        if (params.collections !== undefined) {
            this.collections = params.collections;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.aboutLinks !== undefined) {
            this.aboutLinks = params.aboutLinks;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
        if (params.uname !== undefined) {
            this.uname = params.uname;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.tabTitles !== undefined) {
            this.tabTitles = params.tabTitles;
        }
    }
    updateStateVars(params: MineDetailDestinationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPathStack.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__wallpapers.purgeDependencyOnElmtId(rmElmtId);
        this.__collections.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__aboutLinks.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
        this.__uname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPathStack.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__wallpapers.aboutToBeDeleted();
        this.__collections.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        this.__aboutLinks.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
        this.__uname.aboutToBeDeleted();
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
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __wallpapers: ObservedPropertyObjectPU<WallpaperItem[]>;
    get wallpapers() {
        return this.__wallpapers.get();
    }
    set wallpapers(newValue: WallpaperItem[]) {
        this.__wallpapers.set(newValue);
    }
    private __collections: ObservedPropertyObjectPU<CollectionItem[]>;
    get collections() {
        return this.__collections.get();
    }
    set collections(newValue: CollectionItem[]) {
        this.__collections.set(newValue);
    }
    private __userInfo: ObservedPropertyObjectPU<UserInfoData>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfoData) {
        this.__userInfo.set(newValue);
    }
    private __aboutLinks: ObservedPropertyObjectPU<AboutLink[]>;
    get aboutLinks() {
        return this.__aboutLinks.get();
    }
    set aboutLinks(newValue: AboutLink[]) {
        this.__aboutLinks.set(newValue);
    }
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    private __uname: ObservedPropertySimplePU<string>;
    get uname() {
        return this.__uname.get();
    }
    set uname(newValue: string) {
        this.__uname.set(newValue);
    }
    private dialogController: CustomDialogController;
    private tabTitles: string[];
    aboutToAppear(): void {
        // 初始化用户数据
        let ui = new UserInfoData();
        ui.avatar = mockUserInfo.avatar;
        ui.uname = mockUserInfo.uname;
        ui.sex_tit = mockUserInfo.sex_tit;
        ui.nation = mockUserInfo.nation;
        ui.reg_time = mockUserInfo.reg_time;
        this.userInfo = ui;
        this.uname = ui.uname;
        // 初始化about链接
        let a1 = new AboutLink();
        a1.title = 'GitHub';
        a1.url = 'https://github.com';
        let a2 = new AboutLink();
        a2.title = 'Gitee';
        a2.url = 'https://gitee.com';
        let a3 = new AboutLink();
        a3.title = '意见反馈';
        a3.url = '';
        this.aboutLinks = [a1, a2, a3];
        this.loadData();
    }
    async loadData(): Promise<void> {
        this.loading = true;
        await new Promise<void>((resolve: Function) => setTimeout(resolve, 600));
        // 初始化壁纸
        let raw = mockWallpapers.slice(0, 9);
        let wl: WallpaperItem[] = [];
        for (let i = 0; i < raw.length; i++) {
            let w: WallpaperItem = {
                id: raw[i].id,
                title: raw[i].title,
                url_type: raw[i].url_type,
                url: raw[i].url,
                is_checked: raw[i].is_checked,
                color: getRandomColor()
            };
            wl.push(w);
        }
        this.wallpapers = wl;
        // 初始化收藏
        let cl: CollectionItem[] = [];
        for (let i = 0; i < mockCollections.length; i++) {
            let c: CollectionItem = {
                id: mockCollections[i].id,
                wallpaper_type: mockCollections[i].wallpaper_type,
                wallpaper_url: mockCollections[i].wallpaper_url,
                create_time: mockCollections[i].create_time,
                is_checked: mockCollections[i].is_checked,
                color: getRandomColor(),
                format_date: mockCollections[i].format_date
            };
            cl.push(c);
        }
        this.collections = cl;
        this.loading = false;
    }
    async deleteCollections(ids: string[]): Promise<void> {
        this.collections = this.collections.filter(c => !ids.includes(c.id));
        toast.success('已删除');
    }
    WallpaperTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MineDetail.ets(145:5)", "entry");
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/MineDetail.ets(146:7)", "entry");
            Grid.columnsTemplate('1fr 1fr 1fr');
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
                        GridItem.width('100%');
                        GridItem.debugLine("entry/src/main/ets/pages/MineDetail.ets(148:11)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(149:13)", "entry");
                            Column.onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined); });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.url);
                            Image.debugLine("entry/src/main/ets/pages/MineDetail.ets(150:15)", "entry");
                            Image.width('100%');
                            Image.height(180);
                            Image.borderRadius(8);
                            Image.backgroundColor(item.color);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(151:15)", "entry");
                            Text.fontSize(12);
                            Text.margin({ top: 6 });
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.wallpapers, forEachItemGenFunction, (item: WallpaperItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Scroll.pop();
    }
    CollectionTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MineDetail.ets(166:5)", "entry");
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(167:7)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/MineDetail.ets(168:9)", "entry");
            Grid.columnsTemplate('1fr 1fr 1fr');
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
                        GridItem.width('100%');
                        GridItem.debugLine("entry/src/main/ets/pages/MineDetail.ets(170:13)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Stack.create();
                            Stack.debugLine("entry/src/main/ets/pages/MineDetail.ets(171:15)", "entry");
                            Stack.onClick(() => { this.navPathStack.pushPathByName('SetWallpaper', undefined); });
                        }, Stack);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.wallpaper_url);
                            Image.debugLine("entry/src/main/ets/pages/MineDetail.ets(172:17)", "entry");
                            Image.width('100%');
                            Image.height(200);
                            Image.borderRadius(8);
                            Image.backgroundColor(item.color);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.format_date);
                            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(173:17)", "entry");
                            Text.fontSize(10);
                            Text.fontColor(Color.White);
                            Text.position({ x: '5%', y: 170 });
                            Text.backgroundColor('rgba(0,0,0,0.4)');
                            Text.borderRadius(6);
                            Text.padding({ left: 6, right: 6, top: 3, bottom: 3 });
                        }, Text);
                        Text.pop();
                        Stack.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.collections, forEachItemGenFunction, (item: CollectionItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.collections.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('清空收藏');
                        Button.debugLine("entry/src/main/ets/pages/MineDetail.ets(186:11)", "entry");
                        Button.fontSize(13);
                        Button.backgroundColor('#ff4d4f');
                        Button.fontColor(Color.White);
                        Button.borderRadius(20);
                        Button.height(36);
                        Button.margin({ top: 16 });
                        Button.onClick(() => {
                            let ids: string[] = [];
                            for (let i = 0; i < this.collections.length; i++) {
                                ids.push(this.collections[i].id);
                            }
                            this.deleteCollections(ids);
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    UserInfoTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MineDetail.ets(203:5)", "entry");
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(204:7)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(205:9)", "entry");
            Row.width('90%');
            Row.padding({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.userInfo.avatar);
            Image.debugLine("entry/src/main/ets/pages/MineDetail.ets(206:11)", "entry");
            Image.width(60);
            Image.height(60);
            Image.borderRadius(30);
            Image.border({ width: 2, color: '#a794ff' });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(207:11)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.uname);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(208:13)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.reg_time);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(209:13)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/MineDetail.ets(211:11)", "entry");
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(214:9)", "entry");
            Row.width('90%');
            Row.height(1);
            Row.backgroundColor('#f0f0f0');
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(215:9)", "entry");
            Row.width('90%');
            Row.height(56);
            Row.onClick(() => {
                if (this.dialogController !== undefined) {
                    this.dialogController.open();
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('昵称');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(216:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#666666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.uname);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(217:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#333333');
            Text.margin({ right: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('>');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(218:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#cccccc');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(223:9)", "entry");
            Row.width('90%');
            Row.height(0.5);
            Row.backgroundColor('#f0f0f0');
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(224:9)", "entry");
            Row.width('90%');
            Row.height(56);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('性别');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(225:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#666666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.sex_tit);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(226:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(228:9)", "entry");
            Row.width('90%');
            Row.height(0.5);
            Row.backgroundColor('#f0f0f0');
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(229:9)", "entry");
            Row.width('90%');
            Row.height(56);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('国家/地区');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(230:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#666666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.nation);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(231:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(233:9)", "entry");
            Row.width('90%');
            Row.height(0.5);
            Row.backgroundColor('#f0f0f0');
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(234:9)", "entry");
            Row.width('90%');
            Row.height(56);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册日期');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(235:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#666666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.reg_time);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(236:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
    }
    AboutTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MineDetail.ets(245:5)", "entry");
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(246:7)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(247:9)", "entry");
            Column.padding({ top: 40, bottom: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💌');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(248:11)", "entry");
            Text.fontSize(48);
            Text.margin({ top: 14 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('壁纸小屋');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(249:11)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 14 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('v1.0.1');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(250:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/MineDetail.ets(253:9)", "entry");
            List.width('100%');
            List.divider({ strokeWidth: 0.5, color: '#f0f0f0', startMargin: 16 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
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
                            if (item.url) {
                                toast.info('打开链接: ' + item.url);
                            }
                            else {
                                toast.info('意见反馈功能');
                            }
                        });
                        ListItem.debugLine("entry/src/main/ets/pages/MineDetail.ets(255:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(256:15)", "entry");
                            Row.width('100%');
                            Row.height(54);
                            Row.alignItems(VerticalAlign.Center);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(257:17)", "entry");
                            Text.fontSize(15);
                            Text.fontColor('#333333');
                            Text.layoutWeight(1);
                            Text.margin({ left: 16 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('>');
                            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(258:17)", "entry");
                            Text.fontSize(18);
                            Text.fontColor('#cccccc');
                            Text.margin({ right: 16 });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.aboutLinks, forEachItemGenFunction, (item: AboutLink): string => item.title, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(269:9)", "entry");
            Column.width('100%');
            Column.padding({ top: 40, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Copyright © 2026 Wallpaper House');
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(270:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#cccccc');
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/MineDetail.ets(279:7)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(280:9)", "entry");
                    Row.width('100%');
                    Row.height(52);
                    Row.backgroundColor('#ffffff');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('←');
                    Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(281:11)", "entry");
                    Text.fontSize(24);
                    Text.fontColor('#333333');
                    Text.margin({ left: 16 });
                    Text.onClick(() => { this.navPathStack.pop(); });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.title);
                    Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(283:11)", "entry");
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                    Text.textAlign(TextAlign.Center);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/MineDetail.ets(285:11)", "entry");
                    Row.width(24);
                    Row.height(24);
                    Row.margin({ right: 16 });
                }, Row);
                Row.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Tabs.create({ index: this.currentTab });
                    Tabs.debugLine("entry/src/main/ets/pages/MineDetail.ets(288:9)", "entry");
                    Tabs.barMode(BarMode.Scrollable);
                    Tabs.barHeight(42);
                    Tabs.barBackgroundColor('#ffffff');
                    Tabs.onChange((index: number) => {
                        this.currentTab = index;
                        this.title = this.tabTitles[index];
                    });
                    Tabs.layoutWeight(1);
                }, Tabs);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.WallpaperTab.bind(this)();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.SubTabBar.call(this, this.tabTitles[0], 0);
                        } });
                    TabContent.debugLine("entry/src/main/ets/pages/MineDetail.ets(289:11)", "entry");
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.CollectionTab.bind(this)();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.SubTabBar.call(this, this.tabTitles[1], 1);
                        } });
                    TabContent.debugLine("entry/src/main/ets/pages/MineDetail.ets(290:11)", "entry");
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.UserInfoTab.bind(this)();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.SubTabBar.call(this, this.tabTitles[2], 2);
                        } });
                    TabContent.debugLine("entry/src/main/ets/pages/MineDetail.ets(291:11)", "entry");
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.AboutTab.bind(this)();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.SubTabBar.call(this, this.tabTitles[3], 3);
                        } });
                    TabContent.debugLine("entry/src/main/ets/pages/MineDetail.ets(292:11)", "entry");
                }, TabContent);
                TabContent.pop();
                Tabs.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.loading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new Loading(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MineDetail.ets", line: 300, col: 29 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "Loading" });
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
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MineDetail" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#f5f5f5');
            NavDestination.debugLine("entry/src/main/ets/pages/MineDetail.ets(278:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    SubTabBar(title: string, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/MineDetail.ets(308:5)", "entry");
            Text.fontSize(14);
            Text.fontColor(this.currentTab === index ? '#a794ff' : '#999999');
            Text.fontWeight(this.currentTab === index ? FontWeight.Bold : FontWeight.Normal);
            Text.padding({ left: 10, right: 10 });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MineDetailDestinationComponent";
    }
}
registerNamedRoute(() => new MineDetailDestinationComponent(undefined, {}), "", { bundleName: "com.example.endapp", moduleName: "entry", pagePath: "pages/MineDetail", pageFullPath: "entry/src/main/ets/pages/MineDetail", integratedHsp: "false", moduleType: "followWithHap" });
