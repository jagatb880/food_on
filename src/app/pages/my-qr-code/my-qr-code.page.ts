import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Dialog } from '@capacitor/dialog';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.page.html',
  styleUrls: ['./my-qr-code.page.scss'],
})
export class MyQrCodePage implements OnInit {
  qrCodeString: any;
  showQRCode: boolean;
  product: any;
  productLotData: any;
  lat: any;
  lng: any;
  constructor(
    private _location: Location,
    private router: Router,
    private sharedSvc: SharedService,
    private geolocation: Geolocation,
    private apiDataBinding: ApiDataBindService
  ) {}

  ngOnInit() {
    this.productLotData = this.sharedSvc.productLotData;
    this.product = this.sharedSvc.productData;
    console.log(this.productLotData);
    this.showQRCode = false;
    this.initialize();
  }

  async initialize() {
    let result = await this.getCurrentLocation();
    await this.getQRCodeOperByProdLotId();
  }

  getQRCodeOperByProdLotId() {
    let params = {
      id_production_lot: this.productLotData.id,
      id_user_received: this.sharedSvc.userId,
    };
    this.apiDataBinding.getQRCodeOperByProdLotId(params).then((data) => {
      if (data.status == 200 && data.data.length == 0) {
        this.showQRCode = false;
        this.showConfirm();
      } else if (data.status == 200) {
        this.showQRCode = true;
        this.generateQRCode(data.data[0].id);
      }
    });
  }

  getCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  generateQRCode(data: string) {
    this.qrCodeString = data.toString();
  }

  showConfirm = async () => {
    const { value } = await Dialog.confirm({
      message: `There is no QR code registered for this product. Would you like to generate one?`,
    });
    if (value == true) {
      this.apiDataBinding
        .createProducerQRCodeOperation(
          this.productLotData.id,
          this.lat,
          this.lng
        )
        .then((data) => {
          if (data.status == 200 && data.data != null) {
            this.generateQRCode(data.data.id);
          }
        });
    }
  };

  goToBack() {
    this._location.back();
  }

  scanQrCode() {
    this.router.navigate(['view-trace']);
  }

  convertDate(date) {
    let isoDate = new Date(date);
    let newDate = isoDate.toISOString().substring(0, 10);
    let formatedDate =
      newDate.split('-')[2] +
      '-' +
      newDate.split('-')[1] +
      '-' +
      newDate.split('-')[0];
    return formatedDate;
  }
}
