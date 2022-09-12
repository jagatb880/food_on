import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailsPageRoutingModule } from './view-details-routing.module';
// import { ViewDetailsPopupComponent } from 'src/app/pages/component/view-details-popup/view-details-popup.component';

import { ViewDetailsPage } from './view-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailsPageRoutingModule,
    // ViewDetailsPopupComponent
  ],
  declarations: [ViewDetailsPage]
})
export class ViewDetailsPageModule {}
