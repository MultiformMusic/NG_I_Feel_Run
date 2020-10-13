import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('modalLogin') modalLogin: any;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    
      this.modalLogin.openModal();
  }

}
