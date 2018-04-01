import * as Config from './../config';
import { Localizer } from './../../localization';

/**
 * Represents a page helper.
 */
export interface Type {
  config: Config.Type;
  localizer: Localizer.Type;
}