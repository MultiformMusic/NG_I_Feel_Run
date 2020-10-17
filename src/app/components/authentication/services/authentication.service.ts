import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getUrlCloudFuncions } from 'src/app/helpers/HepersFunctions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { secureConstants } from '../../../helpers/secureConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebaseAuth: AngularFireAuth, 
              private httpClient: HttpClient,
              private localeStorageService: LocalStorageService) { }

      /**
     * 
     * Authentification sur firebase
     * 
     * @param email 
     * @param password 
     */
    async loginFirebase(email: string, password: string): Promise<firebase.auth.UserCredential> {
        
      return this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }


  /**
   * 
   * Récupération token utilisateur
   * 
   */
    async getCurrentTokenUser() {

      let token = null;

      try {

        const response = await this.firebaseAuth.currentUser;
        token = await response.getIdToken();
        
      } catch (error) {
        console.log("getCurrentTokenUser error : " + error);
      }

      return token;
    }

    /**
     * 
     * Création d'un token custom pour l'uid, 30 jours d'expiration
     * 
     * @param uid 
     */
    async createCustomUserToken(uid: string): Promise<any> {

      const user = {
        "uid": uid
      }

      try {

        return this.httpClient.post(getUrlCloudFuncions('URL_CREATE_CUSTOM_TOKEN'), JSON.stringify({user})).toPromise();
        
      } catch (error) {
        console.log(error);
      }
    }

    async checkAuthenticated() {

      const token = this.localeStorageService.get(secureConstants.STORAGE_TOKEN);
      console.log(token);

    }
}
