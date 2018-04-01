import { JSObject, Nullable, Types } from 'javascriptutilities';
import * as Dependency from './common/dependency';

export namespace Custom {
  export let keys: (keyof Type)[] = ['dependency'];

  /**
   * Represents a custom world object that exposes common functionalities for
   * all steps. Add properties (such as logged in username) here so that they
   * can be accessed anywhere.
   */
  export interface Type {
    readonly dependency: Dependency.Type;
  }

  /**
   * Construct a world object with the required parameters.
   * @param {JSObject<any>} world A possible world object.
   * @param {Dependency.Type} dependency A Dependency instance.
   */
  export function construct(world: JSObject<any>, dependency: Dependency.Type): void {
    world.dependency = dependency;
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