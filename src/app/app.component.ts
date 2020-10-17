import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './components/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'I-Feel-Run';

  constructor(private router: Router, private authService: AuthenticationService) {}

  async ngOnInit() {

    const isAuthenticated = await this.authService.checkAuthenticated();
    if (isAuthenticated)  this.router.navigate(['connected/home']);
    else this.router.navigate(['home']);
  }

}
