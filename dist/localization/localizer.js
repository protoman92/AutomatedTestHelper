"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const javascriptutilities_1 = require("javascriptutilities");
function builder() {
    return new Builder();
}
exports.builder = builder;
/**
 * Represents a localizer object.
 * @implements {Type} Type implementation.
 */
class Self {
    constructor() {
        this.languages = {};
    }
    /**
     * Simply localize without defaulting to any plan B.
     * @param {Language.Case} language A Language case.
     * @param {string} word A string value.
     * @returns {Try<string>} A Try instance.
     */
    localizeRaw(language, word) {
        let languages = this.languages;
        let lcLanguage = language.toLowerCase();
        return javascriptutilities_1.Try.unwrap(languages[lcLanguage]).flatMap(v => javascriptutilities_1.Try.unwrap(v[word]));
    }
    localize(language, word) {
        return this.localizeRaw(language, word)
            .successOrElse(() => javascriptutilities_1.Try.unwrap(this.defaultLanguage)
            .flatMap(v => this.localizeRaw(v, word)))
            .getOrElse(word);
    }
}
/**
 * Builder for localizer.
 */
class Builder {
    constructor() {
        this.localizer = new Self();
    }
    /**
     * Add a new language.
     * @param {string} language A string value.
     * @param {JSObject<string>} json A JSON instance.
     * @returns {this} The current Builder instance.
     */
    addLanguage(language, json) {
        this.localizer.languages[language.toLowerCase()] = json;
        return this;
    }
    /**
     * Set the default language. If access to a language is not possible, default
     * to this language.
     * @param {Language.Case} language A Language case.
     * @returns {this} The current Builder instance.
     */
    withDefaultLanguage(language) {
        this.localizer.defaultLanguage = language;
        return this;
    }
    build() {
        return this.localizer;
    }
}
exports.Builder = Builder;
//# sourceMappingURL=localizer.js.map