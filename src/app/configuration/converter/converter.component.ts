import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  @Input() value: string;
  @Input() type: string;
  private units: {};
  convertValue: string = '';

  private storeConfigSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.storeConfigSub = this.store.select(fromRoot.getUnits).subscribe(
      (units: {}) => this.units = units
    )
  }

  ngOnDestroy(): void {

    if (this.storeConfigSub) {
      this.storeConfigSub.unsubscribe();
    }
  }

}
