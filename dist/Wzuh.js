"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wzuh = void 0;
function Wzuh(mapping) {
    return function (constructor) {
        var keysMap = new Map();
        if (mapping) {
            for (var _i = 0, _a = Object.getOwnPropertyNames(mapping); _i < _a.length; _i++) {
                var key = _a[_i];
                keysMap.set(key, mapping[key]);
            }
        }
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                var params = args.length > 0 ? args[0] : null;
                if (params && typeof params === 'object') {
                    for (var _a = 0, _b = Object.getOwnPropertyNames(params); _a < _b.length; _a++) {
                        var key = _b[_a];
                        var thisKey = keysMap.get(key) || key;
                        if (params.hasOwnProperty(thisKey)) {
                            _this[thisKey] = params[key];
                        }
                    }
                }
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
exports.Wzuh = Wzuh;
