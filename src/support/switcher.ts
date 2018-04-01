import { JSObject } from 'javascriptutilities';
import { Dependency } from './common';

/**
 * Get the correct dependency based on provided world config. For example, if
 * the config specifies the tests to be web-based, we create web dependencies.
 * The same goes for mobile tests.
 *
 * This method must be customized based on the project being tested.
 * @param {JSObject<any>} _worldConfig A world config object.
 * @returns {Dependency.Type} A Dependency instance.
 */
export function createDependency(_worldConfig: JSObject<any>): Dependency.Type {
  throw Error('Must implement this');
}