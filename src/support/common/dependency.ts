import { Observable } from 'rxjs';
import * as Page from './page';

/**
 * Represents a test dependency. This dependency is responsible for providing
 * page objects and init/deinit methods.
 */
export interface Type {
  page: Page.Type;
  beforeEach(): Observable<void>;
  afterEach(): Observable<void>;
}