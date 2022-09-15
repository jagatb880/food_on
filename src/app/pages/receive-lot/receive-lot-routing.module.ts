import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveLotPage } from './receive-lot.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveLotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveLotPageRoutingModule {}
