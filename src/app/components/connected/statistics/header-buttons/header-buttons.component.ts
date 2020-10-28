import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';``
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { StatsState } from '../ngrx/stats.reducer';
import * as statsAction from '../../statistics/ngrx/stats.actions';

@Component({
  selector: 'stats-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent implements OnInit, OnDestroy {

  private storeSubStats: Subscription;

  disabledRunning = false;
  disabledWalking = false;
  disabledCycling = false;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    // connexion au state stats
    this.storeSubStats = this.store.select(fromRoot.getStatsDatas).subscribe(
      (statsDatas: StatsState) => {
        this.setButtonsStatut(statsDatas.activityTypeActive);
      }
    )
  }
  
  setButtonsStatut(activityTypeActive: string) {
    
    if (activityTypeActive === "RUNNING") {
      this.disabledRunning = true;
      this.disabledCycling = false;
      this.disabledWalking = false;
    } else if (activityTypeActive === "WALKING") {
      this.disabledRunning = false;
      this.disabledCycling = false;
      this.disabledWalking = true;
    } else if (activityTypeActive === "CYCLING") {
      this.disabledRunning = false;
      this.disabledCycling = true;
      this.disabledWalking = false;     
    }
  }

  selectedActivity = (activityType: string) => {
    
    this.store.dispatch(new statsAction.setActivityTypeActive(activityType));
    
  }

  ngOnDestroy(): void {
    if (this.storeSubStats) {
      this.storeSubStats.unsubscribe();
    }
  }
  
}
