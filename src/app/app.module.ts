import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { IntroComponent } from './components/intro/intro.component';
import { TestComponent } from './components/test/test.component';

import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
