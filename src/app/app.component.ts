import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './components/authentication/services/authentication.service';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import * as authActions from './components/authentication/ngrx/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'I-Feel-Run';

  constructor(private router: Router, 
              private store: Store<fromRoot.State>,
              private authService: AuthenticationService) {}

  async ngOnInit() {

    const user = await this.authService.checkAuthenticated();
    if (user) {
      this.store.dispatch(new authActions.setUser(user));
      this.router.navigate(['connected/home']);
    }  
      
    else this.router.navigate(['intro']);
  }

}
