import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../app.reducer';
import * as authActions from '../ngrx/auth.actions';
import { ThrowStmt } from '@angular/compiler';

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
              private store: Store<fromRoot.State>,
              private authService: AuthenticationService) { }

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

    try {

      const response = await this.authService.loginFirebase(user.email, user.password);
      const {email, uid} = response.user;
      console.log(response.user.email);
      console.log(response.user.uid);
      this.authenticationInProgress = false;

      this.store.dispatch(new authActions.setIsAuthenticated(true));
      this.store.dispatch(new authActions.setUser({email, uid}));

      
    } catch (error) {
      console.log(error);
      this.authenticationInProgress = false;
    }

    /*this.authenticationService.loginMongoUser(user).subscribe(
      (res: Response) => {

        this.authenticationService.loginFirebase(secureConstants.FIREBASE_EMAIL, secureConstants.FIREBASE_PASSWORD);
        this.callCloudFunction = false;
        this.modalLogin.nativeElement.style.display = 'none';
        this.router.navigate(['/connected/home']);

        setTimeout(() => {
          location.reload();
        }, 1);

      },
      (errorResponse) => {
        this.callCloudFunction = false;
        this.errors = [];
        this.errors.push(JSON.parse(errorResponse._body).errors[0]);
      }
    );*/

  }
  
}
