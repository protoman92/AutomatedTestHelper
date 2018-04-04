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
            .delay(this.config.elementLocatedDelay)
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
    findSelectedOption(selectLocator, optionLocatorFn) {
        return this.findOne(selectLocator)
            .map(v => v.getOrThrow())
            .flatMap(v => v.getAttribute('value'))
            .map(v => optionLocatorFn(selectLocator, v))
            .flatMap(v => this.findOne(v))
            .catchJustReturn(e => javascriptutilities_1.Try.failure(e));
    }
    findSelectedOptionWithXPath(xpath) {
        let locator = wd.By.xpath(xpath);
        let optionLocatorFn = (_, b) => {
            return wd.By.xpath(`${xpath}/option[@value='${b}']`);
        };
        return this.findSelectedOption(locator, optionLocatorFn);
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