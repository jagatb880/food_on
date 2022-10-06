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
  prductname: any;
  lotcode: any;
  amountofunit: any;
  salesprice: any;
  valueeachunit: any;
  enddate: any;
  exipredate: any;
  disablestatus = false;
  savebutton = false;
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
    if (this.productLotData != null) {
      this.savebutton = false;
      this.sharedSvc.showLoader();
      this.fetchProductLotDetails();
      this.productLotDetails = '';
      this.productLotDetailsDataValue = [];
    } else {
      this.disablestatus = false;
      this.savebutton = true;
    }
  }

  fetchProductLotDetails() {
    let data: IMyProductLotDetails = {
      id_production_lot: this.productLotData.id,
      id_user: this.sharedSvc.userId,
    };
    console.log(data);
    this.apiDataBinding.getMyProductLotDetails(data).then((data) => {
      console.log(data);
      if (data.status == 200 && data.data != null) {
        this.productLotDetails = data.data[0];
        this.productLotDetailsDataValue = this.productLotDetails.datavalues;
        console.log();
        this.prductname = this.productLotDetails.name;
        this.lotcode = this.productLotDetails.code_bar_lot;
        this.amountofunit = this.productLotDetails.amount;
        this.salesprice = '$' + this.productLotDetails.sale_value;
        this.valueeachunit = Number(
          this.productLotDetails.value_each_unit
        ).toFixed(3);
        this.enddate = this.productLotDetails.production_date;
        this.exipredate = this.productLotDetails.expiration_date;
        this.disablestatus = true;
        this.sharedSvc.dismissLoader();
      } else {
        this.sharedSvc.dismissLoader();
        this.toastSvc.show({
          message: 'No Data Found',
          type: 'error',
        });
        setTimeout(() => {
          this._location.back();
        }, 1000);
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

  enddatevalue() {
    console.log(this.enddate);
  }
  expiredatevalue() {
    console.log(this.exipredate);
  }
}
