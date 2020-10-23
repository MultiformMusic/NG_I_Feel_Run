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

@Component({
  selector: 'app-home-connected',
  templateUrl: './home-connected.component.html',
  styleUrls: ['./home-connected.component.scss']
})
export class HomeConnectedComponent implements OnInit, OnDestroy {

  private storeSubAuth: Subscription;
  private storeSubStats: Subscription;
  private storeSubConfig: Subscription;

  private language: string;

  isAuthenticated: boolean;
  user: User;
  statsIsLoading: Boolean;
  errorMessage: string = null;

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
      (statsDatas: StatsState) => {
        this.statsIsLoading = statsDatas.statsIsLoading;
        this.errorMessage = statsDatas.errorMessage;
      }
    )

    // setTimeout(() => {

    //   this.store.dispatch(new statsAction.statsLoadingFailed('Error message'));
    // }, 2000);

  }

  /**
   * 
   * Chargement des stats
   * 
   */
  async loadStatistics() {

    const activitiesArray = await this.statsService.getUserActivities(this.user.email);
    console.log(activitiesArray);

    // si pas d'activité => erreur
    if (activitiesArray === null) {
      this.store.dispatch(new statsAction.statsLoadingFailed(getLocalizeText(this.language, 'statisticsError')));
    }

    // process des activités
    generateStatistics(activitiesArray);

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
