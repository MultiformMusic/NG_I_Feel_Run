import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrlCloudFuncions } from 'src/app/helpers/HepersFunctions';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * Retrouve les activités de l'utilisateur connecté
   * 
   * @param email 
   */
  async getUserActivities(email: string) {

    try {
      
      const res = await this.httpClient.post<any>(getUrlCloudFuncions('URL_ACTIVITIES_WITHOUT_GEO'), JSON.stringify({user: {email}})).toPromise(); 
      if (res && res.message === 'NOK') return null;

      return res.datas;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * 
   * Récupère l'activité avec timestart
   * 
   * @param email 
   * @param timeStart 
   */
  async getActivityFromTimeStart(email: string, timestart: number) {

    try {

      const res = await this.httpClient.post<any>(getUrlCloudFuncions('URL_ACTIVITY_FROM_TIMESTART'), JSON.stringify({email: email, timestart: timestart})).toPromise(); 
      if (res && res.message === 'NOK') return null;

      //return null;
      return res.datas;
      
    } catch (error) {
      console.log(error);
      return null;
    }

  }

}
