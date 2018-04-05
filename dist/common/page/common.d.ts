import { Observable } from 'rxjs';
import { Try } from 'javascriptutilities';
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
 * Create a new common page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A Type instance.
 */
export declare function create(params: Params.Type): Type;
