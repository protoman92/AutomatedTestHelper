import { Config } from './../common';

/**
 * Web-based test config.
 * @extends {Config.Type} Common config extension.
 */
export interface Type extends Config.Type {
  /**
   * The base url with which we will navigate to the web page being tested.
   */
  baseUrl: string;
}