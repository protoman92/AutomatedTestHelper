import { Observable } from 'rxjs';
import * as Page from './page';

/**
 * Represents a test helper. This helper is responsible for setting up the tests,
 * (e.g. navigating to the web page to run tests). This also extends page params
 * to provide a common dependency interface.
 * @extends {Page.Params.Type} Page params extension.
 */
export interface Type extends Page.Params.Type {
  beforeEach(): Observable<void>;
  afterEach(): Observable<void>;
}