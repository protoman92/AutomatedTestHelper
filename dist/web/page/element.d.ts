import { Observable } from 'rxjs';
import * as wd from 'selenium-webdriver';
import { Try } from 'javascriptutilities';
import * as Config from './../config';
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
     * @param {string} text a string value.
     * @returns {Observable<Try<wd.WebElement>>} An Observable instance.
     */
    findOneContainingName(text: string): Observable<Try<wd.WebElement>>;
}
/**
 * Create a new web Element finder.
 * @param {Config.Type} config A Config instance.
 * @param {wd.WebDriver} driver A WebDriver instance.
 * @returns {Type} An Element finder instance.
 */
export declare function create(config: Config.Type, driver: wd.WebDriver): Type;
