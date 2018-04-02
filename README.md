# AutomatedTestHelper

Automated UI test helper. Simply add this project as a dependency and provide custom **.feature** and step definition files.

This repository is split into several folders and sub-folders:

```typescript
src
| features
| support
| | common
| | | page
| | | config.ts
| | | helper.ts
| | | index.ts
| | localization
| | steps
| | web
| | | page
| | | browser.ts
| | | config.ts
| | | helper.ts
| | | index.ts
| | world.ts
```

Any folder or file that has the name **common** contain classes/interfaces with common functionalities for the relevant platform or all platforms.

In the **support** folder, we have a **common** folder and a **web** folder - the contents of which mirror each other quite a bit. This is to indicate that a class/interface in **web** should extend a class/interface with the same name in **common**.

## HOW-TO

In our testing project, assume we have the **Automator** and the test helper:

```typescript
import * as Automator from 'automated_test_helper';
```

- Define a custom **World** object that extends **Automator.World.Base.Type**. This object contains, most importantly, the test **Helper** object, the **Page** object (which is a collection for page objects that drive all interactions), and other states that we would like to store (such as ***username***). In **World.ts**:

```typescript
export interface Type extends Automator.World.Base.Type {
  readonly page: Page.Type;
  readonly username: string;
  readonly password: string;
}
```

- In the folder where we put our steps definitions (e.g. **src/support/steps**), create a file called **common.steps.ts**. In this file, we need to call the following functions:

```typescript
export let world: World.Type;

let setupParams: Automator.Steps.Util.SetupParams.Type = {
  worldConstructor: function(_world, params) {
    let helper = Automator.Web.Helper.create(params);
    let page = Web.Page.create(helper);
    _world.helper = helper;
    _world.page = page;
    world = _world as World.Type;
  }
};

// Set up the world object, with the relevant dependencies.
Automator.Steps.Util.setupWorld(setupParams);
```

- In the code above, we use the default test helper for **Automator.Web**. If we want to add custom functionalities to the helper, we need to define another helper type that extends from **Automator.Web.Helper.Type** and its implementation.

- We then need to implement the relevant page objects, step definitions and feature files.

- Run the tests with command as such:

```typescript
./node_modules/.bin/cucumber-js src --require-module ts-node/register --require 'src/**/*.steps.ts' --world-parameters '{\"browser\":\"chrome\",\"language\":\"en-US\"}'
```

The world constructor will parse **--world-parameters** into a JSON object:

```typescript
{ browser: 'chrome', language: 'en-US' }
```

This JSON object will be used to set up the configuration object.