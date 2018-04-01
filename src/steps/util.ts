import { Observable, Subscription } from 'rxjs';
import * as cucumber from 'cucumber';

import {
  After,
  Before,
  CallbackStepDefinition as CB,
  HookScenarioResult,
} from 'cucumber';

import { Indeterminate } from 'javascriptutilities';
import * as World from './../world';
import { WorldConstructor } from './../world';

export namespace SetupParams {
  /**
   * Represents the parameters to setup/teardown before/after tests.
   */
  export interface Type {
    worldConstructor: WorldConstructor;

    // This will be subscribed to after the default Before method.
    beforeEach: Observable<void>;

    // This will be subscribed to before the default After method.
    afterEach: Observable<void>;
  }
}

/**
 * Setup world object with a world constructor.
 * @param {SetupParams.Type} setupParams A SetupParams instance.
 */
export function setupWorld(setupParams: SetupParams.Type) {
  let subscription: Subscription;
  let world: Indeterminate<World.Base.Type>;

  cucumber.setWorldConstructor(function(params: World.Parameters.Type) {
    World.Parameters.parse(params, (v) => {
      setupParams.worldConstructor(this, v);
      world = World.Base.parse(this);
    });
  });

  Before(function(_result: HookScenarioResult, callback: CB) {
    subscription = new Subscription();

    world!.helper.beforeEach()
      .concat(setupParams.beforeEach)
      .doOnError(e => callback(e))
      .doOnCompleted(() => callback())
      .subscribe()
      .toBeDisposedBy(subscription);
  });

  After(function(_result: HookScenarioResult, callback: CB) {
    setupParams.afterEach
      .concat(world!.helper.afterEach())
      .doOnError(e => callback(e))
      .doOnCompleted(() => callback())
      .subscribe()
      .toBeDisposedBy(subscription);
  });
}

/**
 * Convenience method to mark a step as pending. Note that pending steps are
 * not errors.
 * @param {CB} callback A Callback instance.
 */
export function notifyPendingImplementation(callback: CB): void {
  callback(undefined, 'pending');
}