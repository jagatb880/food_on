import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashLoginPage } from './splash-login.page';

const routes: Routes = [
  {
    path: '',
    component: SplashLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashLoginPageRoutingModule {}
