"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const javascriptutilities_1 = require("javascriptutilities");
const common_1 = require("./../../common");
/**
 * Common web page implementation.
 */
class Self {
    constructor(commonPage, params) {
        this.commonPage = commonPage;
        this.params = params;
    }
    localize(text) {
        return this.commonPage.localize(text);
    }
    verifyActive() {
        return rxjs_1.Observable.of(javascriptutilities_1.Try.failure('Must override this'));
    }
    waitUntilActive() {
        return rxjs_1.Observable.of(javascriptutilities_1.Try.failure('Must override this'));
    }
}
/**
 * Create a new common web page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A common page instance.
 */
function create(params) {
    let commonPage = common_1.Page.Common.create(params);
    return new Self(commonPage, params);
}
exports.create = create;
//# sourceMappingURL=common.js.map