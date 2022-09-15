import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveLotDetailsPage } from './receive-lot-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveLotDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveLotDetailsPageRoutingModule {}
