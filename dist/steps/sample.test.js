"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const World = require("./../world");
let world;
cucumber_1.Before(function (_scenario, callback) {
    world = World.Base.parse(this);
    console.log(world);
    callback();
});
//# sourceMappingURL=sample.test.js.map