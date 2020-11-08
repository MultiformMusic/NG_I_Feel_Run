import { ClassField } from '@angular/compiler';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Units } from '../../models/Units';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnChanges, OnDestroy {

  @Input() value: string;
  @Input() type: string;
  private units: Units;
  convertValue: string = '';

  private storeConfigSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.storeConfigSub = this.store.select(fromRoot.getUnits).subscribe(
      (units: Units) => {
        this.units = units;
        if (this.type === "distance") {
          if (this.units.distance === 'km') {
            this.convertValue = (parseInt(this.value) / 1000).toFixed(1) + " " + units.distance;
          } else {
            this.convertValue = this.value;
          }
        }
      }
    )
  }

  ngOnChanges(): void {

    if (this.units) {
      
      if (this.type === "distance") {
        if (this.units.distance === 'km') {
          this.convertValue = (parseInt(this.value) / 1000).toFixed(1) + " " + this.units.distance;
        } else {
          this.convertValue = this.value;
        }
      }
    }

  }

  ngOnDestroy(): void {

    if (this.storeConfigSub) {
      this.storeConfigSub.unsubscribe();
    }
  }

}
