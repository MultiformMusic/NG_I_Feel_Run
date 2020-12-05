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
        this.doConversion();
      }
    )
  }

  ngOnChanges(): void {

    if (this.units) {
      this.doConversion();
    }

  }

  private doConversion() {

    if (this.type === "distance") {

      if (this.units.distance === 'km') {
        this.convertValue = (parseInt(this.value) / 1000).toFixed(1) + " " + this.units.distance;
      } else {
        this.convertValue = this.value;
      }

    } else if (this.type === "speed") {
      if (this.units.speed === "km/h") {
        this.convertValue = (parseFloat(this.value) * 3.6).toFixed(2) + " " + this.units.speed;
      } else {
        this.convertValue = this.value; 
      }
    } else if (this.type === "speedLast") {
      this.convertValue = (parseFloat(this.value)).toFixed(2) + " " + this.units.speed;
    
    } else if (this.type === "date") {
      this.convertValue = this.value; 
      return this.convertValue;
    }
  }

  ngOnDestroy(): void {

    if (this.storeConfigSub) {
      this.storeConfigSub.unsubscribe();
    }
  }

}
