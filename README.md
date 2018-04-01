# AutomatedTestTemplate

Automated UI test template. Simply clone this project and provide custom **.feature** and step definition files.

This project is split into several folders and sub-folders:

```typescript
src
| features
| support
| | common
| | | page
| | | config.ts
| | | dependency.ts
| | | index.ts
| | localization
| | steps
| | web
| | | localization
| | | page
| | | browser.ts
| | | config.ts
| | | dependency.ts
| | | index.ts
| | switcher.ts
| | world.ts
```

Any folder or file that has the name **common** contain classes/interfaces with common functionalities for the relevant platform or all platforms.

In the **support** folder, we have a **common** folder and a **web** folder - the contents of which mirror each other quite a bit. This is to indicate that a class/interface in **web** should extend a class/interface with the same name in **common**.

Search for the phrase **'Must implement this'** to get an idea of what to customize.