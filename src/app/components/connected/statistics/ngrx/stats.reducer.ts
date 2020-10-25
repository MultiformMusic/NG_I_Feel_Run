import { StatsActions, STATS_IS_LOADING, STATS_LOADING_FAILED, STATS_LOADING_OK, statsIsLoading } from './stats.actions';
import { ActivityTypeStats } from '../../../../models/ActivityTypeStats';


// interface du reducer authentification
export interface StatsState {

    statsIsLoading: Boolean;
    errorMessage: string;
    statsByActivityType: ActivityTypeStats[];
}

// state initial
const INITIAL_STATE: StatsState = {

    statsIsLoading: true,
    errorMessage: null,
    statsByActivityType: [],

}

export function statsReducer (state = INITIAL_STATE, action: StatsActions) {

    switch(action.type) {

        case STATS_IS_LOADING:          
            return { ...state, statsIsLoading: action.payload }
            
        case STATS_LOADING_FAILED:
            return { ...state, statsIsLoading: false, errorMessage: action.payload }

        case STATS_LOADING_OK:
            return { ...state, statsIsLoading: false, errorMessage: null, statsByActivityType: action.payload }

        default:
            return state;
    }
}

// function d'aide pour accèder à l'état du state
export const getStatsDatas = (state: StatsState) => state;
