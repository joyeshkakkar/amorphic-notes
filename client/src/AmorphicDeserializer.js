"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var ModelCtx_1 = require("./ModelCtx");
var AmorphicDeserializer = /** @class */ (function () {
    function AmorphicDeserializer() {
    }
    AmorphicDeserializer.deserialize = function (jsonObject, objectMap) {
        if (!objectMap) {
            objectMap = {};
        }
        if (!jsonObject.__id__) {
            return;
        }
        var modelClass = ModelCtx_1.ModelCtx.getClass(jsonObject._template) || Object;
        if (!modelClass) {
            console.log('Error, missing class. Will default to generic object');
        }
        var obj = new modelClass();
        // const props = Object.getOwnPropertyNames(obj);
        objectMap[jsonObject.__id__.toString()] = obj;
        var _loop_1 = function (jsonProp) {
            if (jsonObject.hasOwnProperty(jsonProp)) {
                var property = jsonObject[jsonProp];
                if (property == null) {
                    obj[jsonProp] = null;
                }
                else if (property !== undefined && property !== null) {
                    if (property instanceof Array && property[0] instanceof Object && property[0].__id__) {
                        obj[jsonProp] = [];
                        property.forEach(function (prop) { return obj[jsonProp].push(AmorphicDeserializer.getChildObject(prop, objectMap)); });
                    }
                    else if (property instanceof Object && property.__id__) {
                        obj[jsonProp] = AmorphicDeserializer.getChildObject(property, objectMap);
                    }
                    else if (moment(property, moment.ISO_8601, true).isValid()) {
                        obj[jsonProp] = new Date(property);
                    }
                    else {
                        obj[jsonProp] = property;
                    }
                }
            }
        };
        for (var jsonProp in jsonObject) {
            _loop_1(jsonProp);
        }
        if (jsonObject._id) {
            obj._id = jsonObject._id;
        }
        return obj;
    };
    AmorphicDeserializer.getChildObject = function (property, objectMap) {
        if (property.__id__ && objectMap[property.__id__.toString()]) {
            return objectMap[property.__id__.toString()];
        }
        else {
            return AmorphicDeserializer.deserialize(property, objectMap);
        }
    };
    return AmorphicDeserializer;
}());
exports.default = AmorphicDeserializer;
//# sourceMappingURL=AmorphicDeserializer.js.map