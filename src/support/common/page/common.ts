import { Observable } from 'rxjs';
import { Language } from './../../localization';
import { Try, Maybe } from 'javascriptutilities';
import * as Helper from './helper';

/**
 * Represents a common page that exposes functionalities to be used by all other
 * pages. This page should be usable both by web/mobile pages.
 */
export interface Type {
  /**
   * Localize with a specified language.
   * @param {string} text A string value.
   * @returns {string} A string value.
   */
  localize(text: string): string;

  /**
   * Verify that the current page is active.
   * @returns {Observable<Try<void>>} An Observable instance.
   */
  verifyActive(): Observable<Try<void>>;
}

/**
 * Represents a common page that exposes functionalities to be used by all other
 * pages.
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  private helper: Helper.Type;

  constructor(params: Helper.Type) {
    this.helper = params;
  }

  localize(text: string): string {
    let language = Try.success(this.helper.config.worldConfig)
      .flatMap(v => Maybe.unwrap(v.language))
      .filter(v => typeof v === 'string', '')
      .map(v => v as Language.Case)
      .getOrElse(Language.Case.EN_US);

    return this.helper.localizer.localize(language, text);
  }

  verifyActive(): Observable<Try<void>> {
    return Observable.of(Try.failure('Must override this'));
  }
}

/**
 * Create a new common page.
 * @param {Helper.Type} helper A Params instance.
 * @returns {Type} A Type instance.
 */
export function create(helper: Helper.Type): Type {
  return new Self(helper);
}