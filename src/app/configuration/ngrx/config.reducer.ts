import { ConfigActions, SET_LANGUAGE } from './config.actions';


// interface state du reducer
export interface ConfigState {

    language: string;
}

// state initial
const INITIAL_STATE: ConfigState = {

    language: navigator.language.substr(0, 2)
}

// reducer config => on modifie le state suivant payload
export function configReducer(state = INITIAL_STATE, action: ConfigActions) {

    switch(action.type) {
    
        case SET_LANGUAGE:

            return {
                ...state,
                language: action.payload
            };

        default:

            return state;
    }

}

// function d'aide pour accèder à l'état du state
export const getLanguage = (state: ConfigState) => state.language;