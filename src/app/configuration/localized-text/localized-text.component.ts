import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { getLocalizeText } from 'src/app/helpers/HepersFunctions';

@Component({
  selector: 'app-localized-text',
  templateUrl: './localized-text.component.html',
  styleUrls: ['./localized-text.component.scss']
})
export class LocalizedTextComponent implements OnInit, OnDestroy {

  @Input() text: string;
  localizedText: string;

  private storeSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    
    this.storeSub = this.store.select(fromRoot.getLanguage).subscribe(
      (language: string) => this.localizedText = getLocalizeText(language, this.text)
    );
  }

  ngOnDestroy() {

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }

  }
}
