import { ConfigActions, SET_LANGUAGE } from './config.actions';
import { Units } from '../../models/Units';


// interface state du reducer
export interface ConfigState {

    language: string;
    units: Units
}

// state initial
const INITIAL_STATE: ConfigState = {

    language: navigator.language.substr(0, 2),
    units: {
        distance: 'km'
    }
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
export const getUnits = (state: ConfigState) => state.units;