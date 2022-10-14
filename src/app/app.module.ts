import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewDetailsPopupComponent } from './component/view-details-popup/view-details-popup.component';
import { ViewGeographyComponent } from './component/view-geography/view-geography.component';
import { RecievelotdetailpopupComponent } from './component/recievelotdetailpopup/recievelotdetailpopup.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FormsModule } from '@angular/forms';
// import { Chart } from 'chart.js';
// import { ChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ViewDetailsPopupComponent,
    ViewGeographyComponent,
    RecievelotdetailpopupComponent,
  ],
  entryComponents: [
    ViewDetailsPopupComponent,
    ViewGeographyComponent,
    RecievelotdetailpopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    Storage,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
