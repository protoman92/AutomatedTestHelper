"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const javascriptutilities_1 = require("javascriptutilities");
var Base;
(function (Base) {
    Base.keys = ['helper'];
    /**
     * Cast a possible world object to the correct type.
     * @param {JSObject<any>} object Key-value object.
     * @returns {Type} A Type instance.
     */
    function parse(object) {
        if (javascriptutilities_1.Types.isInstance(object, ...Base.keys)) {
            return object;
        }
        else {
            throw new Error(`Invalid world object: ${object}`);
        }
    }
    Base.parse = parse;
})(Base = exports.Base || (exports.Base = {}));
var Parameters;
(function (Parameters) {
    Parameters.keys = ['attach', 'parameters'];
    /**
     * Access --world-parameters and propagate it to some outside context.
     * @param {Nullable<Parameters.Type>} params A RawParameters instance.
     * @param {Callback} callback A Callback instance.
     */
    function parse(params, callback) {
        if (javascriptutilities_1.Types.isInstance(params, ...Parameters.keys)) {
            callback(params.parameters);
        }
        else {
            throw new Error(`Unsupported parameters ${params}`);
        }
    }
    Parameters.parse = parse;
})(Parameters = exports.Parameters || (exports.Parameters = {}));
//# sourceMappingURL=world.js.map