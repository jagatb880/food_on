import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGeographicalJourneyPage } from './view-geographical-journey.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGeographicalJourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewGeographicalJourneyPageRoutingModule {}
