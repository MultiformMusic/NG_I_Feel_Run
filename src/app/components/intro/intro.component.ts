import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLocalizeText } from 'src/app/helpers/HepersFunctions';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  intro: String;

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit(): void {

    this.store.select(fromRoot.getLanguage).subscribe(
      (language: string) => {
        console.log(language)
        this.intro = getLocalizeText(language, 'intro');
      }
    );

    setTimeout(() => {
      this.router.navigate(['test']);
    }, 4500);

  }

}
