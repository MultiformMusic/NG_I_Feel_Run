
import { Action } from '@ngrx/store';
import { ActivityTypeStats } from '../../../../models/ActivityTypeStats';

// action type
export const STATS_IS_LOADING = '[STATS] STATS_IS_LOADING';
export const STATS_LOADING_FAILED = '[STATS] STATS_LOADING_FAILED';
export const STATS_LOADING_OK = '[STATS] STATS_LOADING_OK';
export const SET_ACTIVITY_TYPE_ACTIVE = '[STATS] SET_ACTIVITY_TYPE_ACTIVE';

export class statsIsLoading implements Action {

    readonly type = STATS_IS_LOADING;

    constructor(public payload: boolean) {}

}

export class statsLoadingFailed implements Action {

    readonly type = STATS_LOADING_FAILED;

    constructor(public payload: string) {}

}

export class statsLoadingOk implements Action {

    readonly type = STATS_LOADING_OK;

    constructor(public payload: {stats: ActivityTypeStats[], activityTypeActive: string}) {}

}

export class setActivityTypeActive implements Action {

    readonly type = SET_ACTIVITY_TYPE_ACTIVE;

    constructor(public payload: string) {}

}

export type StatsActions = statsIsLoading | statsLoadingFailed | statsLoadingOk | setActivityTypeActive;