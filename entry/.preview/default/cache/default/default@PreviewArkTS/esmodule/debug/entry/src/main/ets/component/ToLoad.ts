if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface InEnd_Params {
}
interface PullUp_Params {
}
interface PullDown_Params {
    hei?: number;
    pullText?: string;
}
export class PullDown extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__hei = new SynchedPropertySimpleOneWayPU(params.hei, this, "hei");
        this.__pullText = new SynchedPropertySimpleOneWayPU(params.pullText, this, "pullText");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PullDown_Params) {
        if (params.hei === undefined) {
            this.__hei.set(25);
        }
        if (params.pullText === undefined) {
            this.__pullText.set('松开刷新');
        }
    }
    updateStateVars(params: PullDown_Params) {
        this.__hei.reset(params.hei);
        this.__pullText.reset(params.pullText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__hei.purgeDependencyOnElmtId(rmElmtId);
        this.__pullText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__hei.aboutToBeDeleted();
        this.__pullText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __hei: SynchedPropertySimpleOneWayPU<number>;
    get hei() {
        return this.__hei.get();
    }
    set hei(newValue: number) {
        this.__hei.set(newValue);
    }
    private __pullText: SynchedPropertySimpleOneWayPU<string>;
    get pullText() {
        return this.__pullText.get();
    }
    set pullText(newValue: string) {
        this.__pullText.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/component/ToLoad.ets(9:5)", "entry");
            Row.width('100%');
            Row.height(this.hei);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/component/ToLoad.ets(10:7)", "entry");
            LoadingProgress.width(20);
            LoadingProgress.height(20);
            LoadingProgress.color('#a794ff');
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.pullText);
            Text.debugLine("entry/src/main/ets/component/ToLoad.ets(14:7)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class PullUp extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PullUp_Params) {
    }
    updateStateVars(params: PullUp_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/component/ToLoad.ets(28:5)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/component/ToLoad.ets(29:7)", "entry");
            LoadingProgress.width(16);
            LoadingProgress.height(16);
            LoadingProgress.color('#a794ff');
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('加载中...');
            Text.debugLine("entry/src/main/ets/component/ToLoad.ets(33:7)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class InEnd extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: InEnd_Params) {
    }
    updateStateVars(params: InEnd_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('—— 已经到底了 ——');
            Text.debugLine("entry/src/main/ets/component/ToLoad.ets(47:5)", "entry");
            Text.fontSize(12);
            Text.fontColor('#cccccc');
            Text.width('100%');
            Text.height(50);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
