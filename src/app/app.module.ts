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
import 'rxjs/add/operator/map';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { BushComponent } from './components/bush/bush.component';
import { DistanceComponent } from './components/distance/distance.component';
import { ShardComponent } from './components/shard/shard.component';
import { LondonBridgeComponent } from './components/london-bridge/london-bridge.component'


@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    BackgroundComponent,
    TitleCardComponent,
    BushComponent,
    DistanceComponent,
    ShardComponent,
    LondonBridgeComponent
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
