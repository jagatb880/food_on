import { Component, OnInit } from '@angular/core';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { Location } from '@angular/common';
import { RecievelotdetailpopupComponent } from 'src/app/component/recievelotdetailpopup/recievelotdetailpopup.component';
import { SharedService } from 'src/app/services/shared.service';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';

@Component({
  selector: 'app-receive-lot-details',
  templateUrl: './receive-lot-details.page.html',
  styleUrls: ['./receive-lot-details.page.scss'],
})
export class ReceiveLotDetailsPage implements OnInit {
  receivelot: any;
  constructor(
    private modalCtrl: ModalController,
    private _location: Location,
    private sharedSvc: SharedService,
    private apiDataBinding: ApiDataBindService
  ) {}

  ngOnInit() {
    this.sharedSvc.showLoader();
    this.sharedSvc.scanedQrCode = '100';
    this.getQRCodeOperAllInfoByQRCodeOperId(this.sharedSvc.scanedQrCode);
  }

  getQRCodeOperAllInfoByQRCodeOperId(id) {
    this.apiDataBinding
      .getQRCodeOperAllInfoByQRCodeOperId(id)
      .then((result) => {
        if (result.status == 200) {
          this.sharedSvc.dismissLoader();
          this.receivelot = result.data;
          console.log(result.data);
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }
  async view() {
    const popover = await this.modalCtrl.create({
      component: RecievelotdetailpopupComponent,
      cssClass: 'login-unlock-modal-class',
    });
    return await popover.present();
  }

  goToBack() {
    this._location.back();
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
