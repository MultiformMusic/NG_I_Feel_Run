import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivityTypeStats } from '../../../../models/ActivityTypeStats';
import { Subscription } from 'rxjs';``
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { StatsState } from '../ngrx/stats.reducer';

@Component({
  selector: 'stats-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {

  private storeSubStats: Subscription;

  ativityDatas: ActivityTypeStats = null;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

      // connexion au state stats
      this.storeSubStats = this.store.select(fromRoot.getStatsDatas).subscribe(
        (statsDatas: StatsState) => {
          this.ativityDatas = statsDatas.statsByActivityType.filter(activity => activity.type === statsDatas.activityTypeActive)[0];
        }
      )
  }

  ngOnDestroy(): void {
    if (this.storeSubStats) {
      this.storeSubStats.unsubscribe();
    }
  }

}
