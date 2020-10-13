import { TEXT_LOCALIZATION } from '../configuration/Textocalization';

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