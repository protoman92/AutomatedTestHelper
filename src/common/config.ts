import { JSObject } from 'javascriptutilities';

/**
 * Represents a test config that contains world-specific configs (e.g. language)
 * and other suite-wide utilities.
 */
export interface Type {
  worldConfig: JSObject<any>;
}