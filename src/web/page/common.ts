import { Observable } from 'rxjs';
import { Try } from 'javascriptutilities';
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
 * Common web page implementation.
 */
class Self implements Type {
  public readonly params: Params.Type;
  private readonly commonPage: Page.Common.Type;

  constructor(commonPage: Page.Common.Type, params: Params.Type) {
    this.commonPage = commonPage;
    this.params = params;
  }

  localize(text: string): string {
    return this.commonPage.localize(text);
  }

  verifyActive(): Observable<Try<any>> {
    return Observable.of(Try.failure('Must override this'));
  }

  waitUntilActive(): Observable<Try<any>> {
    return Observable.of(Try.failure('Must override this'));
  }
}

/**
 * Create a new common web page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A common page instance.
 */
export function create(params: Params.Type): Type {
  let commonPage = Page.Common.create(params);
  return new Self(commonPage, params);
}