import { JSObject, Nullable } from 'javascriptutilities';
import * as Common from './common';
export declare type WorldConstructor = (world: JSObject<any>, params: JSObject<any>) => void;
export declare namespace Base {
    let keys: (keyof Type)[];
    /**
     * Represents a custom world object that exposes common functionalities for
     * all steps. Add properties (such as logged in username) here so that they
     * can be accessed anywhere.
     *
     * For a specific project, we can add the available test pages as a world
     * property so that steps can access the relevant page objects.
     */
    interface Type {
        readonly helper: Common.Helper.Type;
    }
    /**
     * Cast a possible world object to the correct type.
     * @param {JSObject<any>} object Key-value object.
     * @returns {Type} A Type instance.
     */
    function parse(object: JSObject<any>): Type;
}
export declare namespace Parameters {
    type Callback = (params: JSObject<any>) => void;
    let keys: (keyof Type)[];
    /**
     * Represents a world constructor parameter wrapper.
     */
    interface Type {
        attach: Function;
        parameters: JSObject<any>;
    }
    /**
     * Access --world-parameters and propagate it to some outside context.
     * @param {Nullable<Parameters.Type>} params A RawParameters instance.
     * @param {Callback} callback A Callback instance.
     */
    function parse(params: Nullable<Parameters.Type>, callback: Callback): void;
}
