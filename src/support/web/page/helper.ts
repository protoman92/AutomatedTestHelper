import * as wd from 'selenium-webdriver';
import { Helper } from './../../common/page';

/**
 * Web-based test page helper.
 * @extends {Helper.Type} Common helper extension.
 */
export interface Type extends Helper.Type {
  /**
   * The web driver to drive the tests.
   */
  driver: wd.WebDriver;
}