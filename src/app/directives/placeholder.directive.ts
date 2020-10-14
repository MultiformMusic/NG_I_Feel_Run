import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getLocalizeText } from 'src/app/helpers/HepersFunctions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective implements OnInit, OnDestroy {

  @Input('appPlaceholder') text: string;
  private el: ElementRef;
  private storeSub: Subscription;
  private language: string;

  constructor(el: ElementRef, private store: Store<fromRoot.State>) { 
    this.el = el;
  }

  ngOnInit() {

    this.storeSub = this.store.select(fromRoot.getLanguage).subscribe(
      (language: string) => this.language = language);

    const text = getLocalizeText(this.text, this.language);
    
    this.el.nativeElement.placeholder = getLocalizeText(this.language, this.text);
  }

  ngOnDestroy() {

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
