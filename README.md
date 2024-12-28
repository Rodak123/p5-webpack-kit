# p5-webpack-kit

## Disclaimer
This library is an independent enhancement for p5.js. It is not officially affiliated with or endorsed by the p5.js project.

## Why?

I enjoy developing projects using p5.js, but the larger the project the harder it is to keep organized. One solution is to write different code in different scripts. However that requires to include every script inside the index HTML file, in the correct order. This quickly becomes very tideous and hard to read.

Thats why I want to use one of the main benefits of node, the ability of static and dynamic imports of other scripts:

```js
import { myMethod, MyClass } from './myLibrary';
```

Of course this comes at the cost of needing to compile and build the project each time. This is why webpack is used. To easily serve a development server and build the final project.

## Table of Contents
- [Installation](#installation)
- [Project Template](https://github.com/Rodak123/p5-webpack-kit-template)
- [API Reference](docs/API.md)
- [Changelog](docs/CHANGELOG.md)
- [License](docs/LICENSE.md)

## Installation
```shell
npm install p5-webpack-kit
```