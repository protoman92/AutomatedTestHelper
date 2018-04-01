import { Before, CallbackStepDefinition as CB, HookScenarioResult } from 'cucumber';
import * as World from './../world';

let world: World.Custom.Type;

Before(function(_scenario: HookScenarioResult, callback: CB) {
  world = World.Custom.parse(this);
  console.log(world);
  callback();
});