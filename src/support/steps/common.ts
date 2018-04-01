import { Subscription } from 'rxjs';
import * as cucumber from 'cucumber';

import {
  After,
  Before,
  CallbackStepDefinition as CB,
  HookScenarioResult,
} from 'cucumber';

import { Indeterminate } from 'javascriptutilities';
import * as Switcher from './../switcher';
import * as World from './../world';

export type WorldProducer = () => World.Custom.Type;
export type TestContext = (worldFn: WorldProducer) => void;

let subscription: Subscription;
let world: Indeterminate<World.Custom.Type>;

cucumber.setWorldConstructor(function(params: World.Parameters.Type) {
  World.Parameters.parse(params, (v) => {
    let dependency = Switcher.createDependency(v);
    World.Custom.construct(this, dependency);
    world = World.Custom.parse(this);
  });
});

Before(function(_result: HookScenarioResult, callback: CB) {
  subscription = new Subscription();

  world!.dependency.beforeEach()
    .doOnError(e => callback(e))
    .doOnCompleted(() => callback())
    .subscribe()
    .toBeDisposedBy(subscription);
});

After(function(_result: HookScenarioResult, callback: CB) {
  world!.dependency.afterEach()
    .doOnError(e => callback(e))
    .doOnCompleted(() => callback())
    .subscribe()
    .toBeDisposedBy(subscription);
});

/**
 * Convenience method to mark a step as pending. Note that pending steps are
 * not errors.
 * @param {CB} callback A Callback instance.
 */
export function notifyPendingImplementation(callback: CB): void {
  callback(undefined, 'pending');
}