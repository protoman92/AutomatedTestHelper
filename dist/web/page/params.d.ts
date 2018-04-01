import * as wd from 'selenium-webdriver';
import { Page } from './../../common';
/**
 * Web-based test page helper.
 * @extends {Page.Params.Type} Common page params extension.
 */
export interface Type extends Page.Params.Type {
    /**
     * The web driver to drive the tests.
     */
    readonly driver: wd.WebDriver;
}
