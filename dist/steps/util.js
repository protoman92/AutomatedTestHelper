"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const cucumber = require("cucumber");
const cucumber_1 = require("cucumber");
const World = require("./../world");
/**
 * Setup world object with a world constructor.
 * @param {SetupParams.Type} setupParams A SetupParams instance.
 */
function setupWorld(setupParams) {
    let subscription;
    let world;
    cucumber.setWorldConstructor(function (params) {
        World.Parameters.parse(params, (v) => {
            setupParams.worldConstructor(this, v);
            world = World.Base.parse(this);
        });
    });
    cucumber_1.Before(function (_result, callback) {
        subscription = new rxjs_1.Subscription();
        world.helper.beforeEach()
            .concat(setupParams.beforeEach)
            .doOnError(e => callback(e))
            .doOnCompleted(() => callback())
            .subscribe()
            .toBeDisposedBy(subscription);
    });
    cucumber_1.After(function (_result, callback) {
        setupParams.afterEach
            .concat(world.helper.afterEach())
            .doOnError(e => callback(e))
            .doOnCompleted(() => callback())
            .subscribe()
            .toBeDisposedBy(subscription);
    });
}
exports.setupWorld = setupWorld;
/**
 * Convenience method to mark a step as pending. Note that pending steps are
 * not errors.
 * @param {CB} callback A Callback instance.
 */
function notifyPendingImplementation(callback) {
    callback(undefined, 'pending');
}
exports.notifyPendingImplementation = notifyPendingImplementation;
//# sourceMappingURL=util.js.map