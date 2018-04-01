import { Subscription } from 'rxjs';
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

/**
 * Setup world object with a world constructor.
 * @param {WorldConstructor} constructor A WorldConstructor instance.
 */
export function setupWorld(constructor: WorldConstructor) {
  let subscription: Subscription;
  let world: Indeterminate<World.Base.Type>;

  cucumber.setWorldConstructor(function(params: World.Parameters.Type) {
    World.Parameters.parse(params, (v) => {
      constructor(this, v);
      world = World.Base.parse(this);
    });
  });

  Before(function(_result: HookScenarioResult, callback: CB) {
    subscription = new Subscription();

    world!.helper.beforeEach()
      .doOnError(e => callback(e))
      .doOnCompleted(() => callback())
      .subscribe()
      .toBeDisposedBy(subscription);
  });

  After(function(_result: HookScenarioResult, callback: CB) {
    world!.helper.afterEach()
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