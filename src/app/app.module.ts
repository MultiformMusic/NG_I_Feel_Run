import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

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
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/connected/header/header.component';
import { secureConstants } from './helpers/secureConstants';

const dbConfig = {
  name: secureConstants.INDEX_DB_NAME,
  version: 1,
  objectStoresMeta: [{
    store: secureConstants.INDEX_DB_STORE_NAME,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'currentToken', keypath: 'currentToken', options: { unique: false } },
      { name: 'customToken', keypath: 'customToken', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    ModalLoginComponent,
    HomeComponent,
    LocalizedTextComponent,
    PlaceholderDirective,
    HomeConnectedComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    // NgxIndexedDBModule.forRoot(dbConfig),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
