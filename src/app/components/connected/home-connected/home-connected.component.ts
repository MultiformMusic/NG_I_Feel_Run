import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../app.reducer';
import { User } from '../../../models/user';

@Component({
  selector: 'app-home-connected',
  templateUrl: './home-connected.component.html',
  styleUrls: ['./home-connected.component.scss']
})
export class HomeConnectedComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  isAuthenticated: boolean;
  user: User;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.storeSub = this.store.select(fromRoot.getAuthInfos).subscribe(
      (authInfos: any) => {
        this.isAuthenticated = authInfos.isAuthenticated;
        this.user = authInfos.user;
      }
    );
  }

  ngOnDestroy(): void {

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
