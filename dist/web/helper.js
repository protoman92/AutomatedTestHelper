"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const wd = require("selenium-webdriver");
const wdchrome = require("selenium-webdriver/chrome");
const javascriptutilities_1 = require("javascriptutilities");
const Browser = require("./browser");
let chromedriver = require('chromedriver');
/**
 * Represents a test dependency
 * @implements {Type} Type implementation.
 */
class Self {
    constructor(config, localizer) {
        let driver = createDriver(config);
        this.config = config;
        this.driver = driver;
        this.localizer = localizer;
    }
    beforeEach() {
        let url = this.config.baseUrl;
        return rxjs_1.Observable.fromPromise(this.driver.get(url)).delay(1000);
    }
    afterEach() {
        return rxjs_1.Observable.concat(this.driver.quit()).delay(1000);
    }
}
let service = new wdchrome.ServiceBuilder(chromedriver.path).build();
wdchrome.setDefaultService(service);
/**
 * Create a new Chrome driver.
 * @returns {wd.ThenableWebDriver} A ThenableWebDriver instance.
 */
function createChromeDriver() {
    let capabilities = wd.Capabilities.chrome();
    let driverBuilder = new wd.Builder()
        .forBrowser(Browser.Case.CHROME)
        .withCapabilities(capabilities);
    return driverBuilder.build();
}
/**
 * Create a driver based on the specified browser.
 * @param {Config.Type} config A Config instance.
 * @returns {wd.ThenableWebDriver} A ThenableWebDriver instance.
 */
function createDriver(config) {
    let browser = javascriptutilities_1.Try.success(config.worldConfig)
        .map(v => v.browser)
        .filter(v => typeof v === 'string', '')
        .map(v => v)
        .getOrElse(Browser.Case.CHROME);
    switch (browser) {
        case Browser.Case.CHROME:
            return createChromeDriver();
        default:
            throw new Error(`Unsupported browser ${browser}`);
    }
}
exports.createDriver = createDriver;
/**
 * Create a new helper instance.
 * @param {Config.Type} config A Config instance.
 * @param {Localizer.Type} localizer A Localizer instance.
 * @returns {Type} A Type instance.
 */
function create(config, localizer) {
    return new Self(config, localizer);
}
exports.create = create;
//# sourceMappingURL=helper.js.map