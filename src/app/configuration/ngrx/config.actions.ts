import { Action } from '@ngrx/store';

// action type
export const SET_LANGUAGE = '[CONFIG] SET_LANGUAGE';

/** class Action Creator */
export class setLanguage implements Action {

    readonly type = SET_LANGUAGE;

    constructor(public payload: string) {}

}

export type ConfigActions = setLanguage;