// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { BackgroundComponent } from './components/background/background.component';
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
import { VideoBoxComponent } from './components/video-box/video-box.component';
import { ScoreBarComponent } from './components/score-bar/score-bar.component';
import { LevelEndComponent } from './components/level-end/level-end.component'

// Services
import { LerpService } from './services/lerp/lerp.service';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { DataRetrievalService } from './services/data-retrieval/data-retrieval.service';
import { CharPositionOnScreenService } from './services/char-position-on-screen/char-position-on-screen.service';

// Prototype Manipulation
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map';

// Pipes
import { TimesPipe } from './pipes/times-pipe';
import { LevelComponent } from './components/level/level.component';
import { LevelSelectorComponent } from './components/level-selector/level-selector.component';


// Route definition
const appRoutes: Routes = [
  {
    path: '',
    component: LevelComponent,
    data: { "data": "index.json"},
  },
  {
    path: 'senior-software-engineer',
    component: LevelComponent,
    data: { "data": "senior-software-engineer.json"},
  },
  {
    path: 'software-engineer',
    component: LevelComponent,
    data: { "data": "software-engineer.json"},
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

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
    LevelComponent,
    LevelSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    LerpService,
    ScreenSizeService,
    CharPositionOnScreenService,
    DataRetrievalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
