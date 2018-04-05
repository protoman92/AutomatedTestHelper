import { Observable } from 'rxjs';
import { Language } from './../../localization';
import { Try, Maybe } from 'javascriptutilities';
import * as Params from './params';

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
   * Verify that the current page is active and correct. 'Correctness' in this
   * context means all expected elements are present, so we can use this method
   * to check world properties generally. Use this liberally in feature files.
   * @returns {Observable<Try<any>>} An Observable instance.
   */
  verifyCorrectness(): Observable<Try<any>>;

  /**
   * Wait until the current page is active.
   * @returns {Observable<Try<any>>} An Observable instance.
   */
  waitUntilActive(): Observable<Try<any>>;
}

/**
 * Represents a common page that exposes functionalities to be used by all other
 * pages.
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  private params: Params.Type;

  constructor(params: Params.Type) {
    this.params = params;
  }

  localize(text: string): string {
    let language = Try.success(this.params.config.worldConfig)
      .flatMap(v => Maybe.unwrap(v.language))
      .filter(v => typeof v === 'string', '')
      .map(v => v as Language.Case)
      .getOrElse(Language.Case.EN_US);

    return this.params.localizer.localize(language, text);
  }

  verifyCorrectness(): Observable<Try<any>> {
    return Observable.of(Try.failure('Must override this'));
  }

  waitUntilActive(): Observable<Try<any>> {
    return Observable.of(Try.failure('Must override this'));
  }
}

/**
 * Create a new common page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A Type instance.
 */
export function create(params: Params.Type): Type {
  return new Self(params);
}