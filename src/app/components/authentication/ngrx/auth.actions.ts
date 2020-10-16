import { Action } from '@ngrx/store';
import { User } from '../../../models/user';

// action type
export const SET_IS_AUTHENTICATED = '[AUTH] SET_IS_AUTHENTICATED';
export const SET_USER = '[AUTH] SET_USER';

// class action creator
export class setIsAuthenticated implements Action {

    readonly type = SET_IS_AUTHENTICATED;

    constructor(public payload: boolean) {}

}

export class setUser implements Action {

    readonly type = SET_USER;

    constructor(public payload: User) {}

}

export type AuthActions = setIsAuthenticated | setUser;