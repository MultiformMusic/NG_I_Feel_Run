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
 * Converti un temps de type HH:mm:ss en secondes
 * 
 * @param time 
 */
export const convertDateStringToSeconds = (time: string): number => {
    
    const arrayTime = time.split(':');
    const timeSeconds = parseInt(arrayTime[0]) * 3600 + parseInt(arrayTime[1]) * 60 + parseInt(arrayTime[2]);

    return timeSeconds;
}

/**
 * 
 * Converti un temps en secondes en HH:mm:ss
 * 
 * @param time 
 */
export const convertTimeSecondsToString = (time: number): string => {

    var h, m, s, result='';
    // HOURs
    h = Math.floor(time/3600);
    time -= h*3600;
    if(h){
        result = h<10 ? '0'+h+':' : h+':';
    }
    // MINUTEs
    m = Math.floor(time/60);
    time -= m*60;
    result += m<10 ? '0'+m+':' : m+':';
    // SECONDs
    s=time%60;
    result += s<10 ? '0'+s : s;

    if (result.length === 5) result =  "00:" + result;

    return result;
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