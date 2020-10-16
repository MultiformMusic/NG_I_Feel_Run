import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { IntroComponent } from './components/intro/intro.component';

import { reducers } from './app.reducer';
import { ModalLoginComponent } from './components/authentication/modal-login/modal-login.component';
import { HomeComponent } from './components/home/home.component';
import { LocalizedTextComponent } from './configuration/localized-text/localized-text.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HomeConnectedComponent } from './components/connected/home-connected/home-connected.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    ModalLoginComponent,
    HomeComponent,
    LocalizedTextComponent,
    PlaceholderDirective,
    HomeConnectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
