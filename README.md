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
