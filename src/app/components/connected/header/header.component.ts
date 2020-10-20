import { AnimationTriggerMetadata } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated: boolean;
  @Input() user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {

    this.authenticationService.logout();
  }

}
