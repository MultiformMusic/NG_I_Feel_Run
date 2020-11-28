import { Component, Input, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { Activity } from '../../../../models/Activity';
import { GeoPoint } from '../../../../models/GeoPoint';
import { GoogleMapsAPIWrapper, AgmMap } from '@agm/core';


@Component({
  selector: 'last-activity',
  templateUrl: './last-activity.component.html',
  styleUrls: ['./last-activity.component.scss']
})
export class LastActivityComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() lastActivity: Activity;
  @Input() lastActivityGeopoints: GeoPoint[];


  iconUrlStart = {};
  iconUrlStop = {};

  title = 'My first AGM project';
  latStart = 51.678418;
  lngStart = 7.809007;
  latStop = 51.678418;
  lngStop = 7.809007;

  zoom = 10;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {

    this.latStart = this.lastActivityGeopoints[0].latitude;
    this.lngStart = this.lastActivityGeopoints[0].longitude;

    this.latStop = this.lastActivityGeopoints[this.lastActivityGeopoints.length - 1].latitude;
    this.lngStop = this.lastActivityGeopoints[this.lastActivityGeopoints.length - 1].longitude;

    this.iconUrlStart = {
      url: 'http://www.multiform-music.net/i_feel_run1/icon_flag_start.png',
      scaledSize: {
        width: 30,
        height: 30
      }
    }

    this.iconUrlStop = {
      url: 'http://www.multiform-music.net/i_feel_run1/icon_flag_stop.png',
      scaledSize: {
        width: 30,
        height: 30
      }
    }
  }

  ngAfterViewInit() {
    const interValZoom = setInterval(() => {
      this.zoom = this.zoom + 1 ;
          if (this.zoom > 15) {
              clearInterval(interValZoom); 
               // stop the zoom at your desired number
              }
      }, 100);
  }

}
