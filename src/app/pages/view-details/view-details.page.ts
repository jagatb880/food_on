import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { ViewDetailsPopupComponent } from 'src/app/component/view-details-popup/view-details-popup.component';
import { IMyProductLotDetails } from 'src/app/interfaces/my-product-lot-details';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  productLotData: any;
  productLotDetails: any;
  productLotDetailsDataValue: any[];
  data: any;
  constructor(
    private _location: Location,
    private modalCtrl: ModalController,
    private router: Router,
    private apiDataBinding: ApiDataBindService,
    private sharedSvc: SharedService,
    private toastSvc: ToastService
  ) {
    this.productLotData = this.sharedSvc.productLotData;
  }

  ngOnInit() {
    this.fetchProductLotDetails();
    this.productLotDetails = '';
    this.productLotDetailsDataValue = [];
  }

  fetchProductLotDetails() {
    let data: IMyProductLotDetails = {
      id_production_lot: this.productLotData.id,
      id_user: this.sharedSvc.userId,
    };
    this.apiDataBinding.getMyProductLotDetails(data).then((data) => {
      if (data.status == 200 && data.data != null) {
        this.productLotDetails = data.data[0];
        this.productLotDetailsDataValue = this.productLotDetails.datavalues;
      } else {
        this.toastSvc.show({
          message: 'No Data Found',
          type: 'error',
        });
      }
    });
  }

  goToBack() {
    this._location.back();
  }

  async view() {
    //production_date
    const popover = await this.modalCtrl.create({
      component: ViewDetailsPopupComponent,
      componentProps: {
        productLotDataValue: this.productLotDetailsDataValue,
        productionDate: this.convertDate(
          this.productLotDetails.production_date
        ),
      },
      cssClass: 'login-unlock-modal-class',
    });
    return await popover.present();
  }

  convertDate(date) {
    let isoDate = new Date(date);
    let newDate = isoDate.toISOString().substring(0, 10);
    let formatedDate =
      newDate.split('-')[0] +
      '/' +
      newDate.split('-')[1] +
      '/' +
      newDate.split('-')[2];
    return formatedDate;
  }
}
