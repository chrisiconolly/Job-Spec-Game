import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { BackgroundComponent } from './components/background/background.component';

// Services
import { LerpService } from './services/lerp/lerp.service';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { CharPositionOnScreenService } from './services/char-position-on-screen/char-position-on-screen.service';

// Prototype Manipulation
import { TitleCardComponent } from './components/title-card/title-card.component';
import { BushComponent } from './components/bush/bush.component';
import { DistanceComponent } from './components/distance/distance.component';
import { ShardComponent } from './components/shard/shard.component';
import { LondonBridgeComponent } from './components/london-bridge/london-bridge.component';
import { CloudComponent } from './components/cloud/cloud.component';
import { FloatingTextComponent } from './components/floating-text/floating-text.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';
import { PipeComponent } from './components/pipe/pipe.component';
import { FlowerComponent } from './components/flower/flower.component'

import { TimesPipe } from './pipes/times-pipe';
import { VideoBoxComponent } from './components/video-box/video-box.component';
import { ScoreBarComponent } from './components/score-bar/score-bar.component';
import { LevelEndComponent } from './components/level-end/level-end.component'

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    BackgroundComponent,
    TitleCardComponent,
    BushComponent,
    DistanceComponent,
    ShardComponent,
    LondonBridgeComponent,
    CloudComponent,
    FloatingTextComponent,
    VerticalBarChartComponent,
    PipeComponent,
    FlowerComponent,
    HorizontalBarChartComponent,
    TimesPipe,
    VideoBoxComponent,
    ScoreBarComponent,
    LevelEndComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    LerpService,
    ScreenSizeService,
    CharPositionOnScreenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
