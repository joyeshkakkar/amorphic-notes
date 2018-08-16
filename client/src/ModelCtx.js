"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = {};
var ModelCtx = /** @class */ (function () {
    function ModelCtx() {
    }
    ModelCtx.getClass = function (name) {
        return types[name];
    };
    ModelCtx.getInstance = function (name) {
        return ModelCtx.getClass(name).prototype.new();
    };
    return ModelCtx;
}());
exports.ModelCtx = ModelCtx;
//# sourceMappingURL=ModelCtx.js.map