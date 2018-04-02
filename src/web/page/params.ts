import * as wd from 'selenium-webdriver';
import * as Common from './../../common';
import * as Element from './element';

/**
 * Web-based test page params.
 * @extends {Common.Page.Params.Type} Common page params extension.
 */
export interface Type extends Common.Page.Params.Type {
  /**
   * The web driver to drive the tests.
   */
  readonly driver: wd.WebDriver;

  /**
   * The web driver element handler.
   */
  readonly element: Element.Type;
}