import { CallbackStepDefinition as CB } from 'cucumber';
import { WorldConstructor } from './../world';
/**
 * Setup world object with a world constructor.
 * @param {WorldConstructor} constructor A WorldConstructor instance.
 */
export declare function setupWorld(constructor: WorldConstructor): void;
/**
 * Convenience method to mark a step as pending. Note that pending steps are
 * not errors.
 * @param {CB} callback A Callback instance.
 */
export declare function notifyPendingImplementation(callback: CB): void;
