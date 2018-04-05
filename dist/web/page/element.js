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
    /**
     * Defer an Observable to provide logging.
     * @template OE Generics parameter.
     * @param {Observable<OE>} original The original Observable.
     * @param {() => string} logFn A function that produces a string.
     * @returns {Observable<OE>} An Observable instance.
     */
    deferAndLog(original, logFn) {
        let config = this.config;
        return rxjs_1.Observable.defer(() => {
            if (config.loggingEnabled) {
                console.log(logFn());
            }
            return original;
        });
    }
    findOne(locator) {
        let logFn = () => `Finding element with locator: ${locator}`;
        let original = this.element.findOne(locator);
        return this.deferAndLog(original, logFn);
    }
    findOneWithXPath(xpath) {
        let logFn = () => `Finding element with xpath: ${xpath}`;
        let original = this.element.findOneWithXPath(xpath);
        return this.deferAndLog(original, logFn);
    }
    findOneContainingText(text) {
        let logFn = () => `Finding element containing text: ${text}`;
        let original = this.element.findOneContainingText(text);
        return this.deferAndLog(original, logFn);
    }
    findOneWithText(text) {
        let logFn = () => `Finding element with text: ${text}`;
        let original = this.element.findOneWithText(text);
        return this.deferAndLog(original, logFn);
    }
    findOneContainingName(text) {
        let logFn = () => `Finding one containing name: ${text}`;
        let original = this.element.findOneContainingName(text);
        return this.deferAndLog(original, logFn);
    }
    findOneContainingClass(text) {
        let logFn = () => `Finding one containing class: ${text}`;
        let original = this.element.findOneContainingClass(text);
        return this.deferAndLog(original, logFn);
    }
    findOneWithClass(text) {
        let logFn = () => `Finding one with class: ${text}`;
        let original = this.element.findOneWithClass(text);
        return this.deferAndLog(original, logFn);
    }
    findSelectedOption(selectLocator, optionLocatorFn) {
        let logFn = () => `Finding selected option for parent: ${selectLocator}`;
        let original = this.element.findSelectedOption(selectLocator, optionLocatorFn);
        return this.deferAndLog(original, logFn);
    }
    findSelectedOptionWithXPath(xpath) {
        let logFn = () => `Finding selected option with xpath: ${xpath}`;
        let original = this.element.findSelectedOptionWithXPath(xpath);
        return this.deferAndLog(original, logFn);
    }
    pollAndClick(locator) {
        let logFn = () => `Polling/Clicking: ${locator}`;
        let original = this.element.pollAndClick(locator);
        return this.deferAndLog(original, logFn);
    }
    pollAndClickWithXPath(xpath) {
        let logFn = () => `Polling/Clicking with xpath: ${xpath}`;
        let original = this.element.pollAndClickWithXPath(xpath);
        return this.deferAndLog(original, logFn);
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