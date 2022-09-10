import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducerProductsPage } from './producer-products.page';

const routes: Routes = [
  {
    path: '',
    component: ProducerProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducerProductsPageRoutingModule {}
