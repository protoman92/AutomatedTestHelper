import { JSObject } from 'javascriptutilities';

/**
 * Represents a test config that contains world-specific configs (e.g. language)
 * and other suite-wide utilities.
 */
export interface Type {
  /**
   * The config that will be passed in via --world-parameters.
   */
  worldConfig: JSObject<any>;

  /**
   * The number of times to retry if an error is encountered.
   */
  retryCount: number;
}