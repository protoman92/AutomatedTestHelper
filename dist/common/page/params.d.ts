import * as Config from './../config';
import { Localizer } from './../../localization';
/**
 * Represents a page parameter object that provides dependencies.
 */
export interface Type {
    readonly config: Config.Type;
    readonly localizer: Localizer.Type;
}
