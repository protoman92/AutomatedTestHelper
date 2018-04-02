import { JSObject } from 'javascriptutilities';
import * as Page from './page';
/**
 * Represents a test config that contains world-specific configs (e.g. language)
 * and other suite-wide utilities.
 * @extends {Page.Config.Type} Page config extension.
 */
export interface Type extends Page.Config.Type {
    /**
     * The config that will be passed in via --world-parameters.
     */
    worldConfig: JSObject<any>;
}
