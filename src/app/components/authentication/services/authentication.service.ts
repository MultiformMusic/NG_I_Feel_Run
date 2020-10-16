import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebaseAuth: AngularFireAuth) { }

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
}
