import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { NetworkConnectivityService } from './services/network-connectivity.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private _location: Location,
    private platform: Platform,
    private networkSrv: NetworkConnectivityService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.networkSrv.listenNetwork();
      await SplashScreen.hide();
      await this.storage.create();
      CapacitorApp.addListener('backButton', () => {
        if (
          this._location.isCurrentPathEqualTo('/home') ||
          this._location.isCurrentPathEqualTo('/producer-products') ||
          this._location.isCurrentPathEqualTo('/my-distributor') ||
          this._location.isCurrentPathEqualTo('/splash-login')
        ) {
          navigator['app'].exitApp();
        } else {
          this._location.back();
        }
      });
    });
  }
}
