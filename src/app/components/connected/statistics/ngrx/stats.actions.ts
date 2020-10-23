
import { Action } from '@ngrx/store';

// action type
export const STATS_IS_LOADING = '[STATS] STATS_IS_LOADING';
export const STATS_LOADING_FAILED = '[STATS] STATS_LOADING_FAILED';

export class statsIsLoading implements Action {

    readonly type = STATS_IS_LOADING;

    constructor(public payload: boolean) {}

}

export class statsLoadingFailed implements Action {

    readonly type = STATS_LOADING_FAILED;

    constructor(public payload: string) {}

}

export type StatsActions = statsIsLoading | statsLoadingFailed;