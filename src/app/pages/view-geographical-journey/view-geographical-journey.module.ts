import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewGeographicalJourneyPageRoutingModule } from './view-geographical-journey-routing.module';

import { ViewGeographicalJourneyPage } from './view-geographical-journey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewGeographicalJourneyPageRoutingModule
  ],
  declarations: [ViewGeographicalJourneyPage]
})
export class ViewGeographicalJourneyPageModule {}
