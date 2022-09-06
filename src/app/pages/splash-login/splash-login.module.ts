import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashLoginPageRoutingModule } from './splash-login-routing.module';

import { SplashLoginPage } from './splash-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashLoginPageRoutingModule
  ],
  declarations: [SplashLoginPage]
})
export class SplashLoginPageModule {}
