import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewDetailsPopupComponent } from './component/view-details-popup/view-details-popup.component';
import { ViewGeographyComponent } from './component/view-geography/view-geography.component';
import { RecievelotdetailpopupComponent } from './component/recievelotdetailpopup/recievelotdetailpopup.component';
// import { Chart } from 'chart.js';
// import { ChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent, ViewDetailsPopupComponent, ViewGeographyComponent, RecievelotdetailpopupComponent],
  entryComponents: [ViewDetailsPopupComponent, ViewGeographyComponent, RecievelotdetailpopupComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
