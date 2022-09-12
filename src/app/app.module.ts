import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ViewDetailsPopupComponent } from './pages/component/view-details-popup/view-details-popup.component';
import { ViewGeographyComponent } from './pages/component/view-geography/view-geography.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { Chart } from 'chart.js';
// import { ChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent,ViewDetailsPopupComponent,ViewGeographyComponent],
  entryComponents:[ViewDetailsPopupComponent,ViewGeographyComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
