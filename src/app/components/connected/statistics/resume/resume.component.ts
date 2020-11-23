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

}
