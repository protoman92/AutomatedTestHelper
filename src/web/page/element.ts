import { Observable } from 'rxjs';
import * as wd from 'selenium-webdriver';
import { Try } from 'javascriptutilities';
import * as Config from './config';

/**
 * Web-based element finder. This will be passed to the params so that pages
 * can access its methods.
 */
export interface Type {
  /**
   * Find an element with a locator.
   * @param {wd.Locator} locator A Locator instance.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOne(locator: wd.Locator): Observable<Try<wd.WebElement>>;

  /**
   * Find an element with XPath.
   * @param {string} xpath A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneWithXPath(xpath: string): Observable<Try<wd.WebElement>>;

  /**
   * Find an element whose text contains a specified string.
   * @param {string} text A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneContainingText(text: string): Observable<Try<wd.WebElement>>;

  /**
   * Find an element whose text matches a specified string.
   * @param {string} text A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneWithText(text: string): Observable<Try<wd.WebElement>>;

  /**
   * Find an element whose name attribute contains a specified string.
   * @param {string} text A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneContainingName(text: string): Observable<Try<wd.WebElement>>;

  /**
   * Find an element whose class attribute contains a specified string.
   * @param {string} text A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneContainingClass(text: string): Observable<Try<wd.WebElement>>;

  /**
   * Find an element whose class attribute matches a specified string.
   * @param {string} text A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findOneWithClass(text: string): Observable<Try<wd.WebElement>>;

  /**
   * Find the selected option for a <select/> element.
   * @param {wd.Locator} selectLocator A Locator instance.
   * @param {(parent: wd.Locator, value: string) => wd.Locator} optionLocatorFn
   * Function to create child option locator based on parent locator.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findSelectedOption(
    selectLocator: wd.Locator,
    optionLocatorFn: (parent: wd.Locator, value: string) => wd.Locator,
  ): Observable<Try<wd.WebElement>>;

  /**
   * Find the selected opton for a <select/> element.
   * @param {string} xpath A string value.
   * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
   */
  findSelectedOptionWithXPath(xpath: string): Observable<Try<wd.WebElement>>;

  /**
   * Wait until an element is visible to click.
   */
  pollAndClick(locator: wd.Locator): Observable<Try<void>>;

  /**
   * Wait until an element at an xpath is visible to click.
   */
  pollAndClickWithXPath(xpath: string): Observable<Try<void>>;
}

/**
 * Element finder implementation.
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  private readonly config: Config.Type;
  private readonly driver: wd.WebDriver;

  constructor(config: Config.Type, driver: wd.WebDriver) {
    this.config = config;
    this.driver = driver;
  }

  findOne(locator: wd.Locator): Observable<Try<wd.WebElement>> {
    return Observable
      .fromPromise(this.driver.findElement(locator))
      .retry(this.config.retryCount)
      .delay(this.config.elementLocatedDelay)
      .map(v => Try.success(v))
      .catchJustReturn(e => Try.failure<wd.WebElement>(e));
  }

  findOneWithXPath(xpath: string): Observable<Try<wd.WebElement>> {
    return this.findOne(wd.By.xpath(xpath));
  }

  findOneContainingText(text: string): Observable<Try<wd.WebElement>> {
    return this.findOneWithXPath(`//*[contains(text(), '${text}')]`);
  }

  findOneWithText(text: string): Observable<Try<wd.WebElement>> {
    return this.findOneWithXPath(`//*[text()='${text}']`);
  }

  findOneContainingName(text: string): Observable<Try<wd.WebElement>> {
    return this.findOneWithXPath(`//*[contains(@name, '${text}')]`);
  }

  findOneContainingClass(text: string): Observable<Try<wd.WebElement>> {
    return this.findOneWithXPath(`//*[contains(@class, '${text}')]`);
  }

  findOneWithClass(text: string): Observable<Try<wd.WebElement>> {
    return this.findOneWithXPath(`//*[@class='${text}']`);
  }

  findSelectedOption(
    selectLocator: wd.Locator,
    optionLocatorFn: (parent: wd.Locator, value: string) => wd.Locator,
  ): Observable<Try<wd.WebElement>> {
    return this.findOne(selectLocator)
      .map(v => v.getOrThrow())
      .flatMap(v => v.getAttribute('value'))
      .map(v => optionLocatorFn(selectLocator, v))
      .flatMap(v => this.findOne(v))
      .catchJustReturn(e => Try.failure(e));
  }

  findSelectedOptionWithXPath(xpath: string): Observable<Try<wd.WebElement>> {
    let locator = wd.By.xpath(xpath);

    let optionLocatorFn = (_, b: string) => {
      return wd.By.xpath(`${xpath}/option[@value='${b}']`);
    };

    return this.findSelectedOption(locator, optionLocatorFn);
  }

  pollAndClick(locator: wd.Locator): Observable<Try<void>> {
    let driver = this.driver;
    let timeout = this.config.elementWaitTimeout;
    let condition = wd.until.elementLocated(locator);

    return Observable
      .defer(() => Observable.fromPromise(driver.wait(condition, timeout)))
      .flatMap(v => v.click())
      .map(v => Try.success(v))
      .catchJustReturn(e => Try.failure(e));
  }

  pollAndClickWithXPath(xpath: string): Observable<Try<void>> {
    return this.pollAndClick(wd.By.xpath(xpath));
  }
}

/**
 * Create a new web Element finder.
 * @param {Config.Type} config A Config instance.
 * @param {wd.WebDriver} driver A WebDriver instance.
 * @returns {Type} An Element finder instance.
 */
export function create(config: Config.Type, driver: wd.WebDriver): Type {
  return new Self(config, driver);
}