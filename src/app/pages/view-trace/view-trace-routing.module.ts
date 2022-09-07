import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTracePage } from './view-trace.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTracePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTracePageRoutingModule {}
