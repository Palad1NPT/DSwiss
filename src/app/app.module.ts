import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './state/effects/user.effects';
import { userReducer } from './state/reducers/user.reducer';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FileListComponent } from './components/shared/file-list/file-list.component';
import { fileReducer } from './state/reducers/file.reducer';
import { FileEffects } from './state/effects/file.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FileListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: userReducer, file: fileReducer }),
    EffectsModule.forRoot([UserEffects, FileEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
