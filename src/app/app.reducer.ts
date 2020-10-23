import * as fromConfig from './configuration/ngrx/config.reducer';
import * as fromAtuh from './components/authentication/ngrx/auth.reducer';
import * as fromStats from './components/connected/statistics/ngrx/stats.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// aggrégation des states
export interface State {

    config: fromConfig.ConfigState;
    auth: fromAtuh.AuthState;
    stats: fromStats.StatsState
}

// aggrégation des reducers
export const reducers: ActionReducerMap<State> = {
    
    config: fromConfig.configReducer,
    auth: fromAtuh.authReducer,
    stats: fromStats.statsReducer
}

// sélecteur => méthode retournant partie du state
export const getConfigState = createFeatureSelector<fromConfig.ConfigState>('config');
export const getLanguage = createSelector(getConfigState, fromConfig.getLanguage);

export const getAuthState = createFeatureSelector<fromAtuh.AuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAtuh.getIsAuthenticated);
export const getAuthInfos = createSelector(getAuthState, fromAtuh.getAuthInfos);

export const getStatsState = createFeatureSelector<fromStats.StatsState>('stats');
export const getStatsDatas = createSelector(getStatsState, fromStats.getStatsDatas);