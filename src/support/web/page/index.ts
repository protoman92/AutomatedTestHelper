import * as Helper from './helper';
export { Helper };

import * as Page from './../../common/page';

/**
 * Web-based test pages.
 * @extends {Page.Type} Common page extension.
 */
export interface Type extends Page.Type {}

/**
 * Create a page object with the specified page helper.
 * @param {Helper.Type} _helper A Helper instance.
 * @returns {Type} A Type instance.
 */
export function create(_helper: Helper.Type): Type {
  return {};
}