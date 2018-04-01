import * as Params from './params';
import { Page } from './../../common';
/**
 * Common web page type. We should expose the web driver (or only its methods)
 * here.
 * @extends {Page.Common.Type} Common page extension.
 */
export interface Type extends Page.Common.Type {
    readonly params: Params.Type;
}
/**
 * Create a new common web page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A common page instance.
 */
export declare function create(params: Params.Type): Type;
