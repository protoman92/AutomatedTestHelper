import { JSObject } from 'javascriptutilities';
import * as Language from './language';
export declare function builder(): Builder;
/**
 * Represents a localizer object. We use this localizer object to localize
 * texts on the UI when performing localization testing. This means that those
 * texts must be defined in their token form in the feature files. For e.g., if
 * we are checking for 'login failed', in the relevant feature we must use
 * 'login_error_loginFailed'. The latter will be localized depending on the
 * language config passed by --world-parameters.
 */
export interface Type {
    localize(language: Language.Case, word: string): string;
}
/**
 * Builder for localizer.
 */
export declare class Builder {
    private readonly localizer;
    constructor();
    /**
     * Add a new language.
     * @param {string} language A string value.
     * @param {JSObject<string>} json A JSON instance.
     * @returns {this} The current Builder instance.
     */
    addLanguage(language: string, json: JSObject<string>): this;
    /**
     * Set the default language. If access to a language is not possible, default
     * to this language.
     * @param {Language.Case} language A Language case.
     * @returns {this} The current Builder instance.
     */
    withDefaultLanguage(language: Language.Case): this;
    build(): Type;
}
