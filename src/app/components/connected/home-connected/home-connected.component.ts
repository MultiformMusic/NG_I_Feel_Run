import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../app.reducer';
import * as statsAction from '../statistics/ngrx/stats.actions';
import { User } from '../../../models/user';
import { StatisticsService } from '../statistics/services/statistics.service';
import { StatsState } from '../statistics/ngrx/stats.reducer';
import { getLocalizeText } from 'src/app/helpers/HepersFunctions';
import { generateStatistics } from '../../../helpers/StatisticsHelper';
import { ActivityTypeStats } from '../../../models/ActivityTypeStats';
import { Activity } from '../../../models/Activity';
import { GeoPoint } from '../../../models/GeoPoint';

@Component({
  selector: 'app-home-connected',
  templateUrl: './home-connected.component.html',
  styleUrls: ['./home-connected.component.scss']
})
export class HomeConnectedComponent implements OnInit, OnDestroy {

  private storeSubAuth: Subscription;
  private storeSubStats: Subscription;
  private storeSubConfig: Subscription;

  language: string;

  isAuthenticated: boolean;
  user: User;
  statsIsLoading: Boolean;
  errorMessage: string = null;

  activityDatas: ActivityTypeStats = null;
  lastActivity: Activity;
  lastActivityGeopoints: GeoPoint[];

  constructor(private store: Store<fromRoot.State>, private statsService: StatisticsService) { }

  ngOnInit(): void {

    // utilisateur connecté
    this.storeSubAuth = this.store.select(fromRoot.getAuthInfos).subscribe(
      (authInfos: any) => {
        this.isAuthenticated = authInfos.isAuthenticated;
        this.user = authInfos.user;
        this.loadStatistics();
      }
    );

    this.storeSubConfig = this.store.select(fromRoot.getLanguage).subscribe(
      (language: string) => this.language = language
    );

    // connexion au state stats
    this.storeSubStats = this.store.select(fromRoot.getStatsDatas).subscribe(
      async (statsDatas: StatsState) => {
        this.statsIsLoading = statsDatas.statsIsLoading;
        this.errorMessage = statsDatas.errorMessage;
        this.activityDatas = statsDatas.statsByActivityType.filter(activity => activity.type === statsDatas.activityTypeActive)[0];
        if (this.activityDatas) {
          this.lastActivity = this.activityDatas.activities[this.activityDatas.activities.length - 1];
          const data = await this.statsService.getActivityFromTimeStart(this.user.email, this.lastActivity.timeStartActivity);
          this.lastActivityGeopoints = data.activityGeopoints;
        }
      }
    )
  }

  /**
   * 
   * Chargement des stats
   * 
   */
  async loadStatistics() {

    const activitiesArray = await this.statsService.getUserActivities(this.user.email);

    // si pas d'activité => erreur
    if (activitiesArray === null) {
      this.store.dispatch(new statsAction.statsLoadingFailed(getLocalizeText(this.language, 'statisticsError')));
    }

    // process des activités
    const statsByTypeActivity: ActivityTypeStats[] = generateStatistics(activitiesArray);

    let activityTypeMaxActivities: ActivityTypeStats = null;
    for (const activityType of statsByTypeActivity) {
      if (activityTypeMaxActivities === null || activityTypeMaxActivities.activities.length < activityType.activities.length) {
        activityTypeMaxActivities = activityType;
      }
    }

    setTimeout(() => {

      this.store.dispatch(new statsAction.statsLoadingOk({stats: statsByTypeActivity, activityTypeActive: activityTypeMaxActivities.type}));

    }, 1000);
  }

  ngOnDestroy(): void {

    if (this.storeSubAuth) {
      this.storeSubAuth.unsubscribe();
    }

    if (this.storeSubStats) {
      this.storeSubStats.unsubscribe();
    }

    if (this.storeSubConfig) {
      this.storeSubConfig.unsubscribe();
    }

  }

}
