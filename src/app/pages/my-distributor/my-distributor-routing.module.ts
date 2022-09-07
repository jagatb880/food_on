import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDistributorPage } from './my-distributor.page';

const routes: Routes = [
  {
    path: '',
    component: MyDistributorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDistributorPageRoutingModule {}
