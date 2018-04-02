import { JSObject, Nullable, Types } from 'javascriptutilities';
import * as Common from './common';

// World constructor function that will be used to initialize world properties.
// The world object will be passed as a parameter so we can perform any setup
// on it, such as setting test helper, logged-in username, etc.
export type WorldConstructor = (world: JSObject<any>, params: JSObject<any>) => void;

export namespace Base {
  export let keys: (keyof Type)[] = ['helper'];

  /**
   * Represents a custom world object that exposes common functionalities for
   * all steps. Add properties (such as logged in username) here so that they
   * can be accessed anywhere.
   *
   * For a specific project, we can add the available test pages as a world
   * property so that steps can access the relevant page objects.
   */
  export interface Type {
    readonly helper: Common.Helper.Type;
  }

  /**
   * Cast a possible world object to the correct type.
   * @param {JSObject<any>} object Key-value object.
   * @returns {Type} A Type instance.
   */
  export function parse(object: JSObject<any>): Type {
    if (Types.isInstance<Type>(object, ...keys)) {
      return object;
    } else {
      throw new Error(`Invalid world object: ${object}`);
    }
  }
}

export namespace Parameters {
  export type Callback = (params: JSObject<any>) => void;
  export let keys: (keyof Type)[] = ['attach', 'parameters'];

  /**
   * Represents a world constructor parameter wrapper.
   */
  export interface Type {
    attach: Function;
    parameters: JSObject<any>;
  }

  /**
   * Access --world-parameters and propagate it to some outside context.
   * @param {Nullable<Parameters.Type>} params A RawParameters instance.
   * @param {Callback} callback A Callback instance.
   */
  export function parse(params: Nullable<Parameters.Type>, callback: Callback) {
    if (Types.isInstance<Parameters.Type>(params, ...keys)) {
      callback(params.parameters);
    } else {
      throw new Error(`Unsupported parameters ${params}`);
    }
  }
}