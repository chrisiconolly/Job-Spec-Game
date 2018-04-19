import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { BackgroundComponent } from './components/background/background.component';

// Services
import { LerpService } from './services/lerp/lerp.service';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { CharPositionOnScreenService } from './services/char-position-on-screen/char-position-on-screen.service';

// Prototype Manipulation
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'


@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LerpService,
    ScreenSizeService,
    CharPositionOnScreenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
