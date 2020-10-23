import { TEXT_LOCALIZATION } from '../configuration/Textocalization';
import { secureConstants } from './secureConstants';
import { environment } from '../../environments/environment';

export const localizeTexts = (language: string, arrayOfTexts: string[]) : string[] => {

    let arrayLocalizedTexts: string[] = [];

    arrayLocalizedTexts = arrayOfTexts.map(text => {

        const textFinal = text[0].toLowerCase() + text.slice(1);
        return TEXT_LOCALIZATION[textFinal + "_" + language.toUpperCase()];
    });

    return arrayLocalizedTexts;
}

/**
 * 
 * Localisation du text suivant language
 * 
 * @param language 
 * @param text 
 */
export const getLocalizeText = (language: string, text: string) : string => {

    return TEXT_LOCALIZATION[text + "_" + language.toUpperCase()];

} 

/**
 * 
 * Retourne le code text par rapport au code erreur firebase
 * 
 * @param codeError 
 */
export const getTextFromFirebaseError = (codeError: string): string => {

    switch (codeError) {

        case 'auth/invalid-email':
            return 'authInvalidEmail';
        case 'auth/user-not-found':
            return 'authUserNotFound';
        case 'auth/wrong-password':
            return 'authUserNotFound';

        default:
            return "genericError"
    }
}

/**
 * 
 * Retourne l'url de la cloud function suivant qu'on est config en remote ou non
 * 
 * @param url 
 */
export const getUrlCloudFuncions = (url: string): string => {

    switch (url) {

        case 'URL_CREATE_CUSTOM_TOKEN':
            return environment.production ? secureConstants.URL_CREATE_CUSTOM_TOKEN_REMOTE : secureConstants.URL_CREATE_CUSTOM_TOKEN_LOCAL;
        case 'URL_VALID_TOKEN':
            return environment.production ? secureConstants.URL_VALID_TOKEN_REMOTE : secureConstants.URL_VALID_TOKEN_LOCAL;
        case 'URL_ACTIVITIES_WITHOUT_GEO':
            return environment.production ? secureConstants.URL_ACTIVITIES_WITHOUT_GEO_REMOTE : secureConstants.URL_ACTIVITIES_WITHOUT_GEO_LOCAL;
    }
}