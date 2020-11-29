import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivityTypeStats } from '../../../../models/ActivityTypeStats';

@Component({
  selector: 'stats-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  @Input() activityDatas: ActivityTypeStats;

  ngOnInit(): void {

  }

  orderbyValueDsc = (a: KeyValue<string,number>, b: KeyValue<string,number>): number => {
    return a.value < b.value ? 1 : (a.value < b.value) ? 0 : -1  
  }

}
