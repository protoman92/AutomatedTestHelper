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
     * Verify that the current page is active.
     * @returns {Observable<Try<void>>} An Observable instance.
     */
    verifyActive(): Observable<Try<void>>;
}
/**
 * Create a new common page.
 * @param {Params.Type} params A Params instance.
 * @returns {Type} A Type instance.
 */
export declare function create(params: Params.Type): Type;
