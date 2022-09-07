import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDistributorPageRoutingModule } from './my-distributor-routing.module';

import { MyDistributorPage } from './my-distributor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDistributorPageRoutingModule
  ],
  declarations: [MyDistributorPage]
})
export class MyDistributorPageModule {}
