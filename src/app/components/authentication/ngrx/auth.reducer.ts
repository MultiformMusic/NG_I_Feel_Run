import { AuthActions, SET_IS_AUTHENTICATED, SET_USER } from './auth.actions'
import { User } from '../../../models/user';

// interface du reducer authentification
export interface AuthState {

    isAuthenticated: Boolean;
    user: User;
}

// state initial
const INITIAL_STATE: AuthState = {

    isAuthenticated: false,
    user: null
}

export function authReducer (state = INITIAL_STATE, action: AuthActions) {

    switch(action.type) {

        case SET_IS_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload }

        case SET_USER:
            return { ...state, user: action.payload }

        default:
            return state;
    }
}

// function d'aide pour accèder à l'état du state
export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getUser = (state: AuthState) => state.user;
export const getAuthInfos = (state: AuthState) => state;