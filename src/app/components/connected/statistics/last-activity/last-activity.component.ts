import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Activity } from '../../../../models/Activity';
import { GeoPoint } from '../../../../models/GeoPoint';
import { Path } from '../../../../models/Path';

@Component({
  selector: 'last-activity',
  templateUrl: './last-activity.component.html',
  styleUrls: ['./last-activity.component.scss']
})
export class LastActivityComponent implements OnInit, OnChanges {

  @Input() lastActivity: Activity;
  @Input() lastActivityGeopoints: GeoPoint[];

  POLYLINE_COLOR = '#aad4e0';
  POLYLINE_COLOR_BLUE3 = '#419af4';
  POLYLINE_COLOR_BLUE2 ='#41d6f4';
  POLYLINE_COLOR_BLUE1 ='#41f4d9';
  POLYLINE_COLOR_GREEN ='#83f442';
  POLYLINE_COLOR_GREEN_PLUS = '#e8f441';
  POLYLINE_COLOR_YELLOW = '#fff054';
  POLYLINE_COLOR_ORANGE = '#f4d041';
  POLYLINE_COLOR_ORANGE_PLUS = '#f49a41';
  POLYLINE_COLOR_RED_MOINS = '#f47c41';
  POLYLINE_COLOR_RED = '#f44f41';
  POLYLINE_COLOR_RED_PLUS = '#a02b2b';
  POLYLINE_COLOR_BLACK = '#4f1414';
  POLILYNE_STROKE_WIDTH = 3;

  speedMax05: number;
  speedMax10: number;
  speedMax15: number;
  speedMax20: number;
  speedMax25: number;
  speedMax30: number;
  speedMax40: number;

  iconUrlStart = {};
  iconUrlStop = {};

  latStart = 51.678418;
  lngStart = 7.809007;
  latStop = 51.678418;
  lngStop = 7.809007;

  zoom = 10;

  polylines: Path[] = [];

  weahterIconUrl = "";
  weatherWindOrientation = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {

    if (this.lastActivity && this.lastActivityGeopoints) {

      this.weahterIconUrl = "http://openweathermap.org/img/wn/" + this.lastActivity.weatherStartIcon + ".png";

      // détermination orientation du vent
      const windDeg = this.lastActivity.weatherStartWindDeg;
      if (windDeg > 337.5 && windDeg < 360) {
        this.weatherWindOrientation = "N";
      } else if (windDeg >= 0 && windDeg < 22.5) {
        this.weatherWindOrientation = "N";
      } else if (windDeg >= 22.5 && windDeg < 67.5) {
        this.weatherWindOrientation = "NE";
      } else if (windDeg >= 67.5 && windDeg < 112.5) {
        this.weatherWindOrientation = "E";
      } else if (windDeg >= 112.5 && windDeg < 157.5) {
        this.weatherWindOrientation = "SE";
      } else if (windDeg >= 157.5 && windDeg < 202.5) {
        this.weatherWindOrientation = "S";
      } else if (windDeg >= 202.5 && windDeg < 247.5) {
        this.weatherWindOrientation = "SW";
      } else if (windDeg >= 247.5 && windDeg < 292.5) {
        this.weatherWindOrientation = "W";
      } else if (windDeg >= 292.5 && windDeg < 337.5) {
        this.weatherWindOrientation = "NW";
      }

      this.latStart = this.lastActivityGeopoints[0].latitude;
      this.lngStart = this.lastActivityGeopoints[0].longitude;
  
      this.latStop = this.lastActivityGeopoints[this.lastActivityGeopoints.length - 1].latitude;
      this.lngStop = this.lastActivityGeopoints[this.lastActivityGeopoints.length - 1].longitude;
  
      this.iconUrlStart = {
        url: 'https://firebasestorage.googleapis.com/v0/b/ifeelrunreactnat-1522147172488.appspot.com/o/icon_flag_start.png?alt=media&token=b32bd6d9-0a80-47d2-8788-9680ff25d546',
        scaledSize: {
          width: 30,
          height: 30
        }
      }
  
      this.iconUrlStop = {
        url: 'https://firebasestorage.googleapis.com/v0/b/ifeelrunreactnat-1522147172488.appspot.com/o/icon_flag_stop.png?alt=media&token=1971e0ae-5c3b-4daf-ba86-40c35ddc2e2d',
        scaledSize: {
          width: 30,
          height: 30
        }
      }
  
      this.speedMax05 = this.lastActivity.averageSpeed - (0.05*this.lastActivity.averageSpeed);
      this.speedMax10 = (this.lastActivity.averageSpeed ) - (0.1*this.lastActivity.averageSpeed );
      this.speedMax15 = (this.lastActivity.averageSpeed ) - (0.15*this.lastActivity.averageSpeed );
      this.speedMax20 = (this.lastActivity.averageSpeed ) - (0.20*this.lastActivity.averageSpeed );
      this.speedMax25 = (this.lastActivity.averageSpeed ) - (0.25*this.lastActivity.averageSpeed );
      this.speedMax30 = (this.lastActivity.averageSpeed ) - (0.30*this.lastActivity.averageSpeed );
      this.speedMax40 = (this.lastActivity.averageSpeed ) - (0.40*this.lastActivity.averageSpeed );
      
      this.constructPolylines();
  
      this.zoom = 10;
      const interValZoom = setInterval(() => {
        this.zoom = this.zoom + 1 ;
            if (this.zoom > 14) {
                clearInterval(interValZoom); 
                }
        }, 100);
    }

  }

  /**
   * 
   * Construit le tableau de polylines pour chemin
   * 
   */
  private constructPolylines() {

    this.polylines = this.lastActivityGeopoints.map((geopointInit: GeoPoint, index) => {

      if (this.lastActivityGeopoints[index + 1]) {

        const geopointFin: GeoPoint = this.lastActivityGeopoints[index + 1];

        const pathPoly: Path = {
          path: [
            {latitude: geopointInit.latitude, longitude: geopointInit.longitude}, 
            {latitude: geopointFin.latitude, longitude: geopointFin.longitude}
          ],
          color: this.getPolylineColor(geopointFin)
        }

        return pathPoly;

      } 

    });

  }

  /**
   * 
   * Détermine la couleur de la polyline suivant vitesse
   * 
   * @param geopoint 
   */
  private getPolylineColor(geopoint: GeoPoint): string {


    let polylineColor = this.POLYLINE_COLOR_GREEN; 

    if (geopoint.speed <= this.lastActivity.averageSpeed) {
      polylineColor = this.POLYLINE_COLOR_GREEN_PLUS;
    } if (geopoint.speed <= this.speedMax05) {
      polylineColor = this.POLYLINE_COLOR_YELLOW;
    } if (geopoint.speed <= this.speedMax10) {
      polylineColor = this.POLYLINE_COLOR_ORANGE; 
    } if (geopoint.speed <= this.speedMax15) {
        polylineColor = this.POLYLINE_COLOR_ORANGE_PLUS; 
    } if (geopoint.speed <= this.speedMax20) {
      polylineColor = this.POLYLINE_COLOR_RED_MOINS; 
    } if (geopoint.speed <= this.speedMax25) {
      polylineColor = this.POLYLINE_COLOR_RED; 
    } if (geopoint.speed <= this.speedMax30) {
      polylineColor = this.POLYLINE_COLOR_RED_PLUS; 
    } if (geopoint.speed <= this.speedMax40) {
      polylineColor = this.POLYLINE_COLOR_BLACK; 
    }

    return polylineColor
  }

}
