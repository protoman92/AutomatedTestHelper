import { CallbackStepDefinition as CB } from 'cucumber';
import { WorldConstructor } from './../world';
export declare namespace SetupParams {
    /**
     * Represents the parameters to setup/teardown before/after tests.
     */
    interface Type {
        worldConstructor: WorldConstructor;
    }
}
/**
 * Setup world object with a world constructor.
 * @param {SetupParams.Type} setupParams A SetupParams instance.
 */
export declare function setupWorld(setupParams: SetupParams.Type): void;
/**
 * Convenience method to mark a step as pending. Note that pending steps are
 * not errors.
 * @param {CB} callback A Callback instance.
 */
export declare function notifyPendingImplementation(callback: CB): void;
