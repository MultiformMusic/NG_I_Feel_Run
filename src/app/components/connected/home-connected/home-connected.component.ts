import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../app.reducer';
import * as statsAction from '../statistics/ngrx/stats.actions';
import { User } from '../../../models/user';

@Component({
  selector: 'app-home-connected',
  templateUrl: './home-connected.component.html',
  styleUrls: ['./home-connected.component.scss']
})
export class HomeConnectedComponent implements OnInit, OnDestroy {

  private storeSubAuth: Subscription;
  private storeSubStats: Subscription;

  isAuthenticated: boolean;
  user: User;
  statsIsLoading: boolean;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    // utilisateur connecté
    this.storeSubAuth = this.store.select(fromRoot.getAuthInfos).subscribe(
      (authInfos: any) => {
        this.isAuthenticated = authInfos.isAuthenticated;
        this.user = authInfos.user;
      }
    );

    // initialisation stats
    this.storeSubStats = this.store.select(fromRoot.getStatsIsLoading).subscribe(
      (loading: boolean) => {
        this.statsIsLoading = loading;
      }
    )

    /*setTimeout(() => {

      this.store.dispatch(new statsAction.statsIsLoading(false));
    }, 2000);*/

  }

  ngOnDestroy(): void {

    if (this.storeSubAuth) {
      this.storeSubAuth.unsubscribe();
    }

    if (this.storeSubStats) {
      this.storeSubStats.unsubscribe();
    }
  }

}
