
import { Action } from '@ngrx/store';

// action type
export const STATS_IS_LOADING = '[STATS] STATS_IS_LOADING';

export class statsIsLoading implements Action {

    readonly type = STATS_IS_LOADING;

    constructor(public payload: boolean) {}

}

export type StatsActions = statsIsLoading;