import { Before, CallbackStepDefinition as CB, HookScenarioResult } from 'cucumber';
import * as World from './../world';

let world: World.Base.Type;

Before(function(_scenario: HookScenarioResult, callback: CB) {
  world = World.Base.parse(this);
  console.log(world);
  callback();
});