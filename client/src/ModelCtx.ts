const types: object = {};

export class ModelCtx {
    public static getClass(name: string) {
        return types[name];
    }

    public static getInstance(name: string) {
        return ModelCtx.getClass(name).prototype.new();
    }
}