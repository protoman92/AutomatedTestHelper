"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const localization_1 = require("./../../localization");
const javascriptutilities_1 = require("javascriptutilities");
/**
 * Represents a common page that exposes functionalities to be used by all other
 * pages.
 * @implements {Type} Type implementation.
 */
class Self {
    constructor(params) {
        this.params = params;
    }
    localize(text) {
        let language = javascriptutilities_1.Try.success(this.params.config.worldConfig)
            .flatMap(v => javascriptutilities_1.Maybe.unwrap(v.language))
            .filter(v => typeof v === 'string', '')
            .map(v => v)
            .getOrElse(localization_1.Language.Case.EN_US);
        return this.params.localizer.localize(language, text);
    }
    verifyActive() {
        return rxjs_1.Observable.of(javascriptutilities_1.Try.failure('Must override this'));
    }
    waitUntilActive() {
        return rxjs_1.Observable.of(javascriptutilities_1.Try.failure('Must override this'));
    }
}
/**
 * Create a new common page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A Type instance.
 */
function create(params) {
    return new Self(params);
}
exports.create = create;
//# sourceMappingURL=common.js.map