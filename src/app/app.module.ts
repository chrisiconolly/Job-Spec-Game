import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { BackgroundComponent } from './components/background/background.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
