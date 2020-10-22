import { StatsActions, STATS_IS_LOADING } from './stats.actions';


// interface du reducer authentification
export interface StatsState {

    statsIsLoading: Boolean;
}

// state initial
const INITIAL_STATE: StatsState = {

    statsIsLoading: true,
}

export function statsReducer (state = INITIAL_STATE, action: StatsActions) {

    switch(action.type) {

        case STATS_IS_LOADING:
            return { ...state, statsIsLoading: action.payload }

        default:
            return state;
    }
}

// function d'aide pour accèder à l'état du state
export const getStatsIsLoading = (state: StatsState) => state.statsIsLoading;