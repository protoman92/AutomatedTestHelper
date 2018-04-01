import * as wd from 'selenium-webdriver';
import { Localizer } from './../localization';
import { Helper } from './../common';
import * as Config from './config';
import * as Page from './page';
/**
 * Represents dependencies for web-based tests.
 * @extends {Helper.Type} Common dependency extension.
 * @extends {Page.Params.Type} Web page params extension.
 */
export interface Type extends Helper.Type, Page.Params.Type {
}
/**
 * Create a driver based on the specified browser.
 * @param {Config.Type} config A Config instance.
 * @returns {wd.ThenableWebDriver} A ThenableWebDriver instance.
 */
export declare function createDriver(config: Config.Type): wd.ThenableWebDriver;
/**
 * Create a new helper instance.
 * @param {Config.Type} config A Config instance.
 * @param {Localizer.Type} localizer A Localizer instance.
 * @returns {Type} A Type instance.
 */
export declare function create(config: Config.Type, localizer: Localizer.Type): Type;
