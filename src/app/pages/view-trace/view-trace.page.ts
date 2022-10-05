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

@Component({
  selector: 'app-view-trace',
  templateUrl: './view-trace.page.html',
  styleUrls: ['./view-trace.page.scss'],
})
export class ViewTracePage implements OnInit {
  productLotData: any;
  product: any;
  producerData: any;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private _location: Location,
    private apiDataBindiing: ApiDataBindService,
    private sharedSvc: SharedService
  ) {}

  ngOnInit() {
    this.productLotData = this.sharedSvc.productLotData;
    this.product = this.sharedSvc.productData;
    console.log(this.productLotData);
    this.producerData = '';
    this.sharedSvc.showLoader();
    this.getQRCodeOperByProdLotId(this.productLotData.id);
  }

  getQRCodeOperByProdLotId(id) {
    let params = {
      id_production_lot: id,
      id_user_received: 10,
    };
    this.apiDataBindiing
      .getQRCodeOperByProdLotId(params)
      .then((data) => {
        if (data.status == 200) {
          console.log(data.data);
          this.getQRCodeOperAllInfoByQRCodeOperId(data.data[0].id);
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
        if (data.status == 200) {
          console.log(data.data);
          this.producerData = data.data[0];
          this.sharedSvc.dismissLoader();
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  async view() {
    const popover = await this.modalCtrl.create({
      component: ViewGeographyComponent,
      componentProps: { producerData: this.producerData },
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
