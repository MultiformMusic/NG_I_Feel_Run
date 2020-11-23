import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Activity } from '../../../../models/Activity';

@Component({
  selector: 'last-activity',
  templateUrl: './last-activity.component.html',
  styleUrls: ['./last-activity.component.scss']
})
export class LastActivityComponent implements OnInit, OnChanges {

  @Input() lastActivity: Activity;

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.lastActivity)
  }
}
