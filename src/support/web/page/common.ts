import { Observable } from 'rxjs';
import { Try } from 'javascriptutilities';
import * as Helper from './helper';
import { Page } from './../../common';

/**
 * Common web page type. We should expose the web driver (or only its methods)
 * here.
 * @extends {Page.Common.Type} Common page extension.
 */
export interface Type extends Page.Common.Type {}

/**
 * Common web page implementation.
 */
class Self implements Type {
  private readonly commonPage: Page.Common.Type;

  constructor(commonPage: Page.Common.Type) {
    this.commonPage = commonPage;
  }

  localize(text: string): string {
    return this.commonPage.localize(text);
  }

  verifyActive(): Observable<Try<void>> {
    return Observable.of(Try.failure('Must override this'));
  }
}

/**
 * Create a new common web page.
 * @param {Helper.Type} helper A Helper instance.
 * @returns {Type} A common page instance.
 */
export function create(helper: Helper.Type): Type {
  let commonPage = Page.Common.create(helper);
  return new Self(commonPage);
}