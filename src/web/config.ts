import { Config } from './../common';
import * as Page from './page';

/**
 * Web-based test config.
 * @extends {Config.Type} Common config extension.
 * @extends {Page.Config.Type} Page config extension.
 */
export interface Type extends Config.Type, Page.Config.Type {
  /**
   * The base url with which we will navigate to the web page being tested.
   */
  baseUrl: string;
}