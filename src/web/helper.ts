import { Observable } from 'rxjs';
import * as wd from 'selenium-webdriver';
import * as wdchrome from 'selenium-webdriver/chrome';
import { Try } from 'javascriptutilities';
import { Localizer } from './../localization';
import { Helper } from './../common';
import * as Browser from './browser';
import * as Config from './config';
import * as Page from './page';
let chromedriver = require('chromedriver');

/**
 * Represents dependencies for web-based tests.
 * @extends {Helper.Type} Common dependency extension.
 * @extends {Page.Params.Type} Web page params extension.
 */
export interface Type extends Helper.Type, Page.Params.Type {}

/**
 * Represents a test dependency
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  public readonly config: Config.Type;
  public readonly driver: wd.WebDriver;
  public readonly localizer: Localizer.Type;

  constructor(config: Config.Type, localizer: Localizer.Type) {
    let driver = createDriver(config);
    this.config = config;
    this.driver = driver;
    this.localizer = localizer;
  }

  beforeEach(): Observable<void> {
    let url = this.config.baseUrl;
    return Observable.fromPromise(this.driver.get(url));
  }

  afterEach(): Observable<void> {
    return Observable.concat(this.driver.quit());
  }
}

let service = new wdchrome.ServiceBuilder(chromedriver.path).build();
wdchrome.setDefaultService(service);

/**
 * Create a new Chrome driver.
 * @returns {wd.ThenableWebDriver} A ThenableWebDriver instance.
 */
function createChromeDriver(): wd.ThenableWebDriver {
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
export function createDriver(config: Config.Type): wd.ThenableWebDriver {
  let browser = Try.success(config.worldConfig)
    .map(v => v.browser)
    .filter(v => typeof v === 'string', '')
    .map(v => v as Browser.Case)
    .getOrElse(Browser.Case.CHROME);

  switch (browser) {
    case Browser.Case.CHROME:
      return createChromeDriver();

    default:
      throw new Error(`Unsupported browser ${browser}`);
  }
}

/**
 * Create a new helper instance.
 * @param {Config.Type} config A Config instance.
 * @param {Localizer.Type} localizer A Localizer instance.
 * @returns {Type} A Type instance.
 */
export function create(config: Config.Type, localizer: Localizer.Type): Type {
  return new Self(config, localizer);
}