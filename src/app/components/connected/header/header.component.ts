import { AnimationTriggerMetadata } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated: boolean;
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
