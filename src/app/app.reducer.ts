import * as fromConfig from './configuration/ngrx/config.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// aggrégation des states
export interface State {

    config: fromConfig.ConfigState;
}

// aggrégation des reducers
export const reducers: ActionReducerMap<State> = {
    
    config: fromConfig.configReducer
}

// sélecteur => méthode retournant partie du state
export const getConfigState = createFeatureSelector<fromConfig.ConfigState>('config');
export const getLanguage = createSelector(getConfigState, fromConfig.getLanguage);