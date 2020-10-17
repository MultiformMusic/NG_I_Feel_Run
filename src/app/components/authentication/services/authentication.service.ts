import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getUrlCloudFuncions } from 'src/app/helpers/HepersFunctions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { secureConstants } from '../../../helpers/secureConstants';
import jwt_decode from "jwt-decode";

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

    /**
     * 
     * Détermine si l'utilisateur est déjà authentifié
     * 
     */
    async checkAuthenticated() {

      const token = await this.localeStorageService.get(secureConstants.STORAGE_TOKEN);
      if (!token) return false;
      
      try {

        const res = await this.httpClient.post<any>(getUrlCloudFuncions('URL_VALID_TOKEN'), JSON.stringify({token})).toPromise();
        if (!res || !res.uid) return false;
        const uid = res.uid;

        // vérification uid est bien celui du custom token et custom token non expriré
        const customToken = await this.localeStorageService.get(secureConstants.STORAGE_CUSTOM_TOKEN);
        if (!customToken) return false;
        const decoded: any = jwt_decode(customToken); 
        console.log(decoded.uid);
        
      } catch (error) {
        console.log(error);
      }

    }
}
