import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProducerProductsPageRoutingModule } from './producer-products-routing.module';

import { ProducerProductsPage } from './producer-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProducerProductsPageRoutingModule
  ],
  declarations: [ProducerProductsPage]
})
export class ProducerProductsPageModule {}
