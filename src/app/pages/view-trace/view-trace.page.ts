import { Component, OnInit } from '@angular/core';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { SharedService } from 'src/app/services/shared.service';
import { ViewDetailsPopupComponent } from 'src/app/component/view-details-popup/view-details-popup.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-trace',
  templateUrl: './view-trace.page.html',
  styleUrls: ['./view-trace.page.scss'],
})
export class ViewTracePage implements OnInit {
  productLotData: any;
  product: any;
  producerData: any;
  steperdatas: any[];
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private _location: Location,
    private apiDataBindiing: ApiDataBindService,
    private sharedSvc: SharedService,
    private toastSvc: ToastService
  ) {}

  ngOnInit() {
    this.productLotData = this.sharedSvc.productLotData;
    this.product = this.sharedSvc.productData;
    console.log(this.productLotData);
    this.producerData = '';
    this.steperdatas = [];
    this.sharedSvc.showLoader();
    this.getQRCodeOperByProdLotId(this.productLotData.id);
  }

  getQRCodeOperByProdLotId(id) {
    let params = {
      id_production_lot: id,
      id_user_received: this.sharedSvc.userId,
    };
    this.apiDataBindiing
      .getQRCodeOperByProdLotId(params)
      .then((data) => {
        if (data.status == 200) {
          console.log(data.data);
          this.sharedSvc.productId = data.data[0].id_product;
          this.getQRCodeOperByProdLotIdNullUserId(id);
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  getQRCodeOperByProdLotIdNullUserId(id) {
    let params = {
      id_production_lot: id,
      id_user_received: null,
    };
    this.apiDataBindiing
      .getQRCodeOperByProdLotId(params)
      .then((data) => {
        if (data.status == 200) {
          this.sharedSvc.dismissLoader();
          console.log(data.data);
          this.steperdatas = data.data;
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  getQRCodeOperAllInfoByQRCodeOperId(id) {
    this.apiDataBindiing
      .getQRCodeOperAllInfoByQRCodeOperId(id)
      .then((data) => {
        this.sharedSvc.dismissLoader();
        if (data.status == 200 && data.data != null) {
          console.log(data.data);
          this.producerData = data.data[0];
          this.showPopup();
        } else if (data.status == 200) {
          this.toastSvc.show({
            message: 'No data found.',
            type: 'error',
          });
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  view(i) {
    this.sharedSvc.showLoader();
    this.getQRCodeOperAllInfoByQRCodeOperId(this.steperdatas[i].id);
  }

  async showPopup() {
    const popover = await this.modalCtrl.create({
      component: ViewGeographyComponent,
      componentProps: { producerData: this.producerData },
      cssClass: 'login-unlock-modal-class',
    });
    popover.onDidDismiss().then((data) => {
      if (data.data == true) {
        this.viewDataValue(this.producerData);
      }
    });
    return await popover.present();
  }

  async viewDataValue(producerData) {
    //production_date
    const popover = await this.modalCtrl.create({
      component: ViewDetailsPopupComponent,
      componentProps: {
        productLotDataValue: producerData.datavalues,
        productionDate: this.convertDate(this.producerData.production_date),
      },
      cssClass: 'login-unlock-modal-class',
    });
    return await popover.present();
  }

  goToBack() {
    this._location.back();
  }

  viewGeographicalJourney() {
    this.router.navigate(['view-geographical-journey']);
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
