"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const wd = require("selenium-webdriver");
const javascriptutilities_1 = require("javascriptutilities");
/**
 * Basic element finder implementation.
 * @implements {Type} Type implementation.
 */
class BasicSelf {
    constructor(config, driver) {
        this.config = config;
        this.driver = driver;
    }
    findOne(locator) {
        return rxjs_1.Observable
            .defer(() => this.driver.findElement(locator))
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
    pollAndClick(locator) {
        let driver = this.driver;
        let timeout = this.config.elementWaitTimeout;
        let condition = wd.until.elementLocated(locator);
        return rxjs_1.Observable
            .defer(() => rxjs_1.Observable.fromPromise(driver.wait(condition, timeout)))
            .flatMap(v => v.click())
            .map(v => javascriptutilities_1.Try.success(v))
            .catchJustReturn(e => javascriptutilities_1.Try.failure(e));
    }
    pollAndClickWithXPath(xpath) {
        return this.pollAndClick(wd.By.xpath(xpath));
    }
}
/**
 * Element finder implementation that supports logging.
 */
class LogSelf {
    constructor(config, element) {
        this.config = config;
        this.element = element;
    }
    findOne(locator) {
        let config = this.config;
        let element = this.element;
        return rxjs_1.Observable.defer(() => {
            if (config.loggingEnabled) {
                console.log(`Finding element with locator: ${locator}`);
            }
            return element.findOne(locator);
        });
    }
    findOneWithXPath(xpath) {
        return this.element.findOneWithXPath(xpath);
    }
    findOneContainingText(text) {
        return this.element.findOneContainingText(text);
    }
    findOneWithText(text) {
        return this.element.findOneWithText(text);
    }
    findOneContainingName(text) {
        return this.element.findOneContainingName(text);
    }
    findOneContainingClass(text) {
        return this.element.findOneContainingClass(text);
    }
    findOneWithClass(text) {
        return this.element.findOneWithClass(text);
    }
    findSelectedOption(selectLocator, optionLocatorFn) {
        return this.element.findSelectedOption(selectLocator, optionLocatorFn);
    }
    findSelectedOptionWithXPath(xpath) {
        return this.element.findSelectedOptionWithXPath(xpath);
    }
    pollAndClick(locator) {
        return this.element.pollAndClick(locator);
    }
    pollAndClickWithXPath(xpath) {
        return this.element.pollAndClickWithXPath(xpath);
    }
}
/**
 * Create a new web Element finder.
 * @param {Config.Type} config A Config instance.
 * @param {wd.WebDriver} driver A WebDriver instance.
 * @returns {Type} An Element finder instance.
 */
function create(config, driver) {
    let basic = new BasicSelf(config, driver);
    return new LogSelf(config, basic);
}
exports.create = create;
//# sourceMappingURL=element.js.map