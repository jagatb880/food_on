import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyQrCodePageRoutingModule } from './my-qr-code-routing.module';

import { MyQrCodePage } from './my-qr-code.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MyQrCodePageRoutingModule,
  ],
  declarations: [MyQrCodePage],
})
export class MyQrCodePageModule {}
