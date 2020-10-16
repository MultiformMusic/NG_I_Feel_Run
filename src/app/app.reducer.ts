import * as fromConfig from './configuration/ngrx/config.reducer';
import * as fromAtuh from './components/authentication/ngrx/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// aggrégation des states
export interface State {

    config: fromConfig.ConfigState;
    auth: fromAtuh.AuthState;
}

// aggrégation des reducers
export const reducers: ActionReducerMap<State> = {
    
    config: fromConfig.configReducer,
    auth: fromAtuh.authReducer
}

// sélecteur => méthode retournant partie du state
export const getConfigState = createFeatureSelector<fromConfig.ConfigState>('config');
export const getLanguage = createSelector(getConfigState, fromConfig.getLanguage);