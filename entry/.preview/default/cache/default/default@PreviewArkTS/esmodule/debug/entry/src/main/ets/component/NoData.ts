if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NoData_Params {
    type?: string;
    state?: number;
}
export class NoData extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__type = new SynchedPropertySimpleOneWayPU(params.type, this, "type");
        this.__state = new SynchedPropertySimpleOneWayPU(params.state, this, "state");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NoData_Params) {
        if (params.type === undefined) {
            this.__type.set('bar');
        }
        if (params.state === undefined) {
            this.__state.set(0);
        }
    }
    updateStateVars(params: NoData_Params) {
        this.__type.reset(params.type);
        this.__state.reset(params.state);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__type.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __type: SynchedPropertySimpleOneWayPU<string>;
    get type() {
        return this.__type.get();
    }
    set type(newValue: string) {
        this.__type.set(newValue);
    }
    private __state: SynchedPropertySimpleOneWayPU<number>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: number) {
        this.__state.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/component/NoData.ets(7:5)", "entry");
            Column.width('100%');
            Column.height(300);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.state === -1 ? '📡' : '📷');
            Text.debugLine("entry/src/main/ets/component/NoData.ets(8:7)", "entry");
            Text.fontSize(60);
            Text.opacity(0.3);
            Text.margin({ top: 40 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.state === -1 ? '网络连接异常' : '暂无数据');
            Text.debugLine("entry/src/main/ets/component/NoData.ets(13:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state === -1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请检查网络后重试');
                        Text.debugLine("entry/src/main/ets/component/NoData.ets(19:9)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#bbbbbb');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
