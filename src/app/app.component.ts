import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { UserProvider } from '../providers/user/user';
import { UtilProvider } from '../providers/util/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  token: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public user: UserProvider,
    public loadingCtrl: LoadingController, public util: UtilProvider) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let loader = this.loadingCtrl.create({});
      loader.present();

      this.util.getItem('token')
      .then(resp => {
        console.log("token resp from LS-->", resp)
        loader.dismiss();
        if (resp) {
          this.util.setToken(resp);
          this.nav.setRoot(TabsPage);
        } else {
          this.nav.setRoot("LoginPage");
        }
      }); // End get token in LS
    });//platform.ready
  }
}
