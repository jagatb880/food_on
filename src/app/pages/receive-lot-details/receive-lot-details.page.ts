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
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-receive-lot-details',
  templateUrl: './receive-lot-details.page.html',
  styleUrls: ['./receive-lot-details.page.scss'],
})
export class ReceiveLotDetailsPage implements OnInit {
  receivelot: any;
  releventdta: any;
  lotbody: { qrcodeoperation: { id_prior_operation: number; id_user_received: number; n_coord: number; w_coord: number; }; };
  constructor(
    private modalCtrl: ModalController,
    private _location: Location,
    private sharedSvc: SharedService,
    private apiDataBinding: ApiDataBindService,
    private networkSvc: NetworkConnectivityService,
    private toastSvc: ToastService
  ) { }

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
          this.releventdta = this.receivelot[0].datavalues;
          console.log(result.data);
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }
  async releventdata() {
    const popover = await this.modalCtrl.create({
      component: RecievelotdetailpopupComponent,
      cssClass: 'login-unlock-modal-class',
      componentProps: {
        releventdata: this.releventdta,
      },
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

  yes() {
    if (this.networkSvc.status) {
      this.lotbody = {
        "qrcodeoperation": {
          "id_prior_operation": this.receivelot[0].id_prior_operation,
          "id_user_received": 5,
          "n_coord": 0,
          "w_coord": 0
        }
      }
      
      this.apiDataBinding
        .sendlotdata(this.lotbody)
        .then(async (data) => {
          console.log(data);
          if (data.status == 200) {
            console.log(data.data.id);

          } else {
            this.toastSvc.show({
              message: data.message,
              type: 'error',
            });
          }
        })
        .catch((error) => {
          this.toastSvc.show({
            message: error,
            type: 'error',
          });
        });

    } else {
      this.toastSvc.show({
        message: ConstantService.message.noInternetConnection,
        type: 'error',
      });
    }
  }
}
