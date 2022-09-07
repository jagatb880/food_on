import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTracePageRoutingModule } from './view-trace-routing.module';

import { ViewTracePage } from './view-trace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTracePageRoutingModule
  ],
  declarations: [ViewTracePage]
})
export class ViewTracePageModule {}
