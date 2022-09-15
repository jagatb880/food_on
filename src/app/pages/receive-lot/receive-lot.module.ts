import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveLotPageRoutingModule } from './receive-lot-routing.module';

import { ReceiveLotPage } from './receive-lot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveLotPageRoutingModule
  ],
  declarations: [ReceiveLotPage]
})
export class ReceiveLotPageModule {}
