import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getUrlCloudFuncions } from 'src/app/helpers/HepersFunctions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { secureConstants } from '../../../helpers/secureConstants';
import jwt_decode from "jwt-decode";
import { EncryptionServiceService } from '../../../services/encryption-service.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebaseAuth: AngularFireAuth, 
              private httpClient: HttpClient,
              private router: Router,
              private localeStorageService: LocalStorageService,
              private encryptionService: EncryptionServiceService) { }

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

    async logout() {

      try {
        const res = await this.firebaseAuth.signOut();
        
      } catch (error) {
        console.log(error);
      }

      this.localeStorageService.remove(secureConstants.STORAGE_TOKEN);
      this.localeStorageService.remove(secureConstants.STORAGE_CUSTOM_TOKEN);

      this.router.navigate(['/home']);
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
     * Le custom token est encrypté
     * 
     * - Comparaison uid token normal (current token) au custom token
     * - Vérification date d'expiration custom token
     * 
     */
    async checkAuthenticated(): Promise<User> {

      const currentToken = await this.localeStorageService.get(secureConstants.STORAGE_TOKEN);
      if (!currentToken) return null;
      const decodedCurrentToken: any = jwt_decode(currentToken); 
      
      try {

        //const res = await this.httpClient.post<any>(getUrlCloudFuncions('URL_VALID_TOKEN'), JSON.stringify({token})).toPromise();
        //if (!res || !res.uid) return false;
        //const uid = res.uid;

        // vérification uid est bien celui du custom token et custom token non expriré
        const customToken = await this.localeStorageService.get(secureConstants.STORAGE_CUSTOM_TOKEN);
        if (!customToken) return null;
        const decryptedToken = this.encryptionService.decryptValue(customToken);
        const decoded: any = jwt_decode(decryptedToken); 
        if (!decoded || !decoded.uid) return null;

        // les uid sont bien les mêmes
        if (decodedCurrentToken.user_id !== decoded.uid) return null;

        // la date d'expiration n'est pas atteinte
        if (Date.now() > decoded.claims.expiresAt) return null;

        return {email: decodedCurrentToken.email, uid: decodedCurrentToken.user_id};

      } catch (error) {
        console.log(error);
        return null;
      }

    }
}
