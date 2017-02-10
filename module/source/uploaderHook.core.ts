export enum hookType {
    beforeAddingFile,
    afterAddingFile,
    errorAddingFile,

    prepareUploadFile,
    progressUploadFile,
    successUploadFile,
    completeUploadFile,
    failedUploadFile,
    cancelUploadFile,   // not implemented right now

    prepareUploadAll,   // not implemented right now
    progressUploadAll,  // not implemented right now
    completeUploadAll
}

export class UploaderHook {
    private _type: hookType = null;
    private _callback: Function = null;
    private _priority: number = null;

    constructor (_hookType: hookType, _callback: Function, _priority = 0) {
        this._type = _hookType;
        this._callback = _callback;
        this._priority = +_priority;
    }

    public get type (): hookType {
        return this._type;
    }

    public get priority (): number {
        return this._priority;
    }

    public get callback(): Function {
        return this._callback;
    }
}
