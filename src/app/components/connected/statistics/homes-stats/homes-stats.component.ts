import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../../../app.reducer';
import { ActivityTypeStats } from '../../../../models/ActivityTypeStats';
import { StatsState } from '../ngrx/stats.reducer';

@Component({
  selector: 'app-homes-stats',
  templateUrl: './homes-stats.component.html',
  styleUrls: ['./homes-stats.component.scss']
})
export class HomesStatsComponent implements OnInit, OnDestroy {

  @Input() language: string;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
