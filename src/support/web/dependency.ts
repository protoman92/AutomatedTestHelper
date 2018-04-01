import { Observable } from 'rxjs';
import * as wd from 'selenium-webdriver';
import * as wdchrome from 'selenium-webdriver/chrome';
import { Try, JSObject } from 'javascriptutilities';
import { Language, Localizer } from './../localization';
import en_us from './localization/en_US';
import { Dependency } from './../common';
import * as Browser from './browser';
import * as Config from './config';
import * as Page from './page';
let chromedriver = require('chromedriver');

/**
 * Represents dependencies for web-based tests.
 * @extends {Dependency.Type} Common dependency extension.
 */
export interface Type extends Dependency.Type {}

/**
 * Represents a test dependency
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  readonly page: Page.Type;
  private readonly config: Config.Type;
  private readonly driver: wd.WebDriver;

  constructor(config: Config.Type, localizer: Localizer.Type) {
    let driver = createDriver(config);
    this.config = config;
    this.driver = driver;
    this.page = Page.create({ config, driver, localizer });
  }

  beforeEach(): Observable<void> {
    let url = this.config.baseUrl;
    return Observable.fromPromise(this.driver.get(url)).delay(1000);
  }

  afterEach(): Observable<void> {
    return Observable.concat(this.driver.quit()).delay(1000);
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
function createDriver(config: Config.Type): wd.ThenableWebDriver {
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
 * Depending on the language, we may have different base URLs. This allows us
 * to be flexible with localization testing.
 * @param {Language.Case} language A Language case.
 * @returns {string} A string value.
 */
function getBaseUrl(language: Language.Case): string {
  switch (language) {
    case Language.Case.EN_US:
      throw Error('Must implement this');

    default:
      throw Error(`Unsupported language: ${language}`);
  }
}

/**
 * Create a new dependency with the specified world config. Customize the config
 * object to provide different test settings, such as remote execution URL
 * (with serverUrl).
 * @param {JSObject<any>} worldConfig A World config object.
 * @returns {Type} A Type instance.
 */
export function create(worldConfig: JSObject<any>): Type {
  let config: Config.Type = {
    worldConfig,
    baseUrl: getBaseUrl(worldConfig.language),
  };

  let localizer = Localizer.builder()
    .addLanguage(Language.Case.EN_US, en_us)
    .withDefaultLanguage(Language.Case.EN_US)
    .build();

  return new Self(config, localizer);
}