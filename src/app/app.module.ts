import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {DateMylistPage} from "../pages/date-mylist/date-mylist";
import {LoginPage} from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { IndexPage } from '../pages/index/index';
import { DateConferPage} from '../pages/date-confer/date-confer';
import { DetailprogrammePage} from '../pages/detailprogramme/detailprogramme';
import { MylistPage} from '../pages/mylist/mylist';
import { ProgrammePage} from '../pages/programme/programme';
import { ShowyearPage} from '../pages/showyear/showyear';
import { SelectsessionPage} from '../pages/selectsession/selectsession';
import { MomentPipe} from '../pipes/moment/moment';
import { ConferenceProvider } from '../providers/conference/conference';
import { ActivityProvider } from '../providers/activity/activity';
import { CheckloginProvider } from '../providers/checklogin/checklogin';
import { DateProvider } from '../providers/date/date';
import { ShowyearProvider } from '../providers/showyear/showyear';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FavProvider } from '../providers/fav/fav';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IndexPage,
    DateConferPage,
    DetailprogrammePage,
    MylistPage,
    ProgrammePage,
    ShowyearPage,
    SelectsessionPage,
    MomentPipe,
    LoginPage,
    DateMylistPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IndexPage,
    DateConferPage,
    DetailprogrammePage,
    MylistPage,
    ProgrammePage,
    ShowyearPage,
    SelectsessionPage,
    LoginPage,
    DateMylistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConferenceProvider,
    ActivityProvider,
    CheckloginProvider,
    DateProvider,
    ShowyearProvider,
    AuthServiceProvider,
    FavProvider,
    LocalNotifications
  ]
})
export class AppModule {}
