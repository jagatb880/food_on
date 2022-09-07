import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionLotPageRoutingModule } from './production-lot-routing.module';

import { ProductionLotPage } from './production-lot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductionLotPageRoutingModule
  ],
  declarations: [ProductionLotPage]
})
export class ProductionLotPageModule {}
