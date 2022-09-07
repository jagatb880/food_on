import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionLotPage } from './production-lot.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionLotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionLotPageRoutingModule {}
