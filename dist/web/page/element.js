"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const wd = require("selenium-webdriver");
const javascriptutilities_1 = require("javascriptutilities");
/**
 * Element finder implementation.
 * @implements {Type} Type implementation.
 */
class Self {
    constructor(config, driver) {
        this.config = config;
        this.driver = driver;
    }
    findOne(locator) {
        return rxjs_1.Observable
            .fromPromise(this.driver.findElement(locator))
            .retry(this.config.retryCount)
            .map(v => javascriptutilities_1.Try.success(v))
            .catchJustReturn(e => javascriptutilities_1.Try.failure(e));
    }
    findOneWithXPath(xpath) {
        return this.findOne(wd.By.xpath(xpath));
    }
    findOneContainingText(text) {
        return this.findOneWithXPath(`//*[contains(text(), '${text}')]`);
    }
    findOneWithText(text) {
        return this.findOneWithXPath(`//*[text()='${text}']`);
    }
    findOneContainingName(text) {
        return this.findOneWithXPath(`//*[contains(@name, '${text}')]`);
    }
    findOneContainingClass(text) {
        return this.findOneWithXPath(`//*[contains(@class, '${text}')]`);
    }
    findOneWithClass(text) {
        return this.findOneWithXPath(`//*[@class='${text}']`);
    }
}
/**
 * Create a new web Element finder.
 * @param {Config.Type} config A Config instance.
 * @param {wd.WebDriver} driver A WebDriver instance.
 * @returns {Type} An Element finder instance.
 */
function create(config, driver) {
    return new Self(config, driver);
}
exports.create = create;
//# sourceMappingURL=element.js.map