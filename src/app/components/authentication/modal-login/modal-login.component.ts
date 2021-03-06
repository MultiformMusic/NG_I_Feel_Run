import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../app.reducer';
import * as authActions from '../ngrx/auth.actions';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { secureConstants } from '../../../helpers/secureConstants';
import { getTextFromFirebaseError } from '../../../helpers/HepersFunctions';
import { EncryptionServiceService } from '../../../services/encryption-service.service';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  @ViewChild('modalLogin') modalLogin: any;
  @ViewChild('modalContainer') modalContainer: any;

  loginForm: FormGroup;
  errors: any[] = [];
  authenticationInProgress: boolean = false;
  

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private store: Store<fromRoot.State>,
              private authService: AuthenticationService,
              private encryptionService: EncryptionServiceService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initForm();
  }

  /** Initialisation du formulaire (reactive forms) */
  initForm() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  /** Gestion MODAL */
  openModal() {

    this.modalLogin.nativeElement.style.display = 'block';
    setTimeout( () => {
      this.modalLogin.nativeElement.className = 'modal fade show modal-transition-in';
    }, 100)
  }

  closeModal() {
    
    this.loginForm.reset();
    this.errors = [];

    this.modalLogin.nativeElement.className = 'modal fade modal-transition-in';
    setTimeout( () => {
      this.modalLogin.nativeElement.style.display = 'none';
    }, 200)
    
  }

  /** Début validation du formulaire */
  isInvalidForm(fieldName: string): boolean {

    return this.loginForm.controls[fieldName].invalid && 
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName: string): boolean {

    return this.loginForm.controls[fieldName].errors.required;
  }
  /** Fin validation du formulaire */

  /**
   * 
   * Détection enter key positionné sur input
   * 
   * @param event 
   */
  onKeydown(event) {
    if (event.key === "Enter" && this.loginForm.valid) {
       this.login(); 
    }
  }

  /**
   * Authentification utilisateur
   * 
   * - authentification utilisateur base mongo
   * - token sauvegardée par le service d'authentification
   * - affichage toaster succés => redirection vers connected/home
   * 
   */
  async login() {

    this.authenticationInProgress = true;
    this.errors = [];

    const user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    let uid: string;
    let email: string;

    // partie authentification normale par email/password
    try {

      const response = await this.authService.loginFirebase(user.email, user.password);
      email = response.user.email;
      uid = response.user.uid;

    } catch (error) {
      console.log(error);
      const codeErrorTransform = getTextFromFirebaseError(error.code);
      this.errors.push({detail: codeErrorTransform});
      this.authenticationInProgress = false;
      return;
    }

    // Récupération des tokens et postionnement dans LocalStorage
    // current token de l'user - custom token contenant
    try {

      // création token custom d'expiration 30 jours
      const {customToken} = await this.authService.createCustomUserToken(uid);
      if (customToken) {
        const encryptedToken = this.encryptionService.encryptValue(customToken)
        this.localStorageService.set(secureConstants.STORAGE_CUSTOM_TOKEN, encryptedToken);
      }
      // récupération token normal (currrent token)
      const currentToken = await this.authService.getCurrentTokenUser();
      this.localStorageService.set(secureConstants.STORAGE_TOKEN, currentToken);
      
    } catch (error) {
      
    }

    this.authenticationInProgress = false;

    // mise à jour du store
    this.store.dispatch(new authActions.setIsAuthenticated(true));
    this.store.dispatch(new authActions.setUser({email, uid}));

    this.modalLogin.nativeElement.style.display = 'none';
    this.router.navigate(['/connected/home']);

  }
  
}
