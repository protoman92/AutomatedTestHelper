import { Indeterminate, JSObject, Try } from 'javascriptutilities';
import * as Language from './language';

export function builder(): Builder {
  return new Builder();
}

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
 * Represents a localizer object.
 * @implements {Type} Type implementation.
 */
class Self implements Type {
  readonly languages: JSObject<JSObject<string>>;
  defaultLanguage: Indeterminate<Language.Case>;

  constructor() {
    this.languages = {};
  }

  /**
   * Simply localize without defaulting to any plan B.
   * @param {Language.Case} language A Language case.
   * @param {string} word A string value.
   * @returns {Try<string>} A Try instance.
   */
  private localizeRaw(language: Language.Case, word: string): Try<string> {
    let languages = this.languages;
    let lcLanguage = language.toLowerCase();
    return Try.unwrap(languages[lcLanguage]).flatMap(v => Try.unwrap(v[word]));
  }

  localize(language: Language.Case, word: string): string {
    return this.localizeRaw(language, word)
      .successOrElse(() => Try.unwrap(this.defaultLanguage)
        .flatMap(v => this.localizeRaw(v, word)))
      .getOrElse(word);
  }
}

/**
 * Builder for localizer.
 */
export class Builder {
  private readonly localizer: Self;

  constructor() {
    this.localizer = new Self();
  }

  /**
   * Add a new language.
   * @param {Language.Case} language A Language case.
   * @param {JSObject<string>} json A JSON instance.
   * @returns {this} The current Builder instance.
   */
  addLanguage(language: Language.Case, json: JSObject<string>): this {
    this.localizer.languages[language.toLowerCase()] = json;
    return this;
  }

  /**
   * Set the default language. If access to a language is not possible, default
   * to this language.
   * @param {Language.Case} language A Language case.
   * @returns {this} The current Builder instance.
   */
  withDefaultLanguage(language: Language.Case): this {
    this.localizer.defaultLanguage = language;
    return this;
  }

  build(): Type {
    return this.localizer;
  }
}