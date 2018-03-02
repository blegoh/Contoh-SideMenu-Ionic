import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, public events: Events) {
    this.initializeApp();

    storage.get('user').then((val) => {
      if (val == null) {
        console.log("qrq");
        this.pages = [
          {title: 'Home', component: HomePage},
          {title: 'List', component: ListPage},
          {title: 'About', component: AboutPage},
          {title: 'Contact', component: ContactPage},
          {title: 'Login', component: LoginPage}
        ];
      } else {
        console.log("asfa");
        this.pages = [
          {title: 'Home', component: HomePage},
          {title: 'List', component: ListPage},
          {title: 'About', component: AboutPage},
          {title: 'Contact', component: ContactPage},
          {title: 'Logout', component: LoginPage}
        ];
      }
    });

    events.subscribe('login', () => {
      console.log("asuuuuuuuu");
      storage.get('user').then((val) => {
        console.log('Your age is', val);
        this.pages = [
          {title: 'Home', component: HomePage},
          {title: 'List', component: ListPage},
          {title: 'About', component: AboutPage},
          {title: 'Contact', component: ContactPage},
          {title: 'Logout', component: LoginPage}
        ];

      });
    });

    events.subscribe('logout', () => {
      console.log("asuuuuuuuu");
      storage.get('user').then((val) => {
        console.log('Your age is', val);

        this.pages = [
          {title: 'Home', component: HomePage},
          {title: 'List', component: ListPage},
          {title: 'About', component: AboutPage},
          {title: 'Contact', component: ContactPage},
          {title: 'Login', component: LoginPage}
        ];
      });
    });

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title == 'Logout') {
      this.storage.remove('user');
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
