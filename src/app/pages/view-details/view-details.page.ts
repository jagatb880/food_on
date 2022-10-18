import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ViewDetailsPopupComponent } from 'src/app/component/view-details-popup/view-details-popup.component';
import { IMyProductLotDetails } from 'src/app/interfaces/my-product-lot-details';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  productData: any;
  productLotData: any;
  productLotDetails: any;
  productLotDetailsDataValue: any[];
  data: any;
  prductname: any;
  lotcode: any;
  amountofunit: any;
  salesprice: any;
  valueeachunit: any;
  productiondate: any;
  exipredate: any;
  codeBar: any;
  disablestatus = false;
  lat: any;
  lng: any;
  constructor(
    private _location: Location,
    private modalCtrl: ModalController,
    private networkSvc: NetworkConnectivityService,
    private apiDataBinding: ApiDataBindService,
    private sharedSvc: SharedService,
    private toastSvc: ToastService,
    private geolocation: Geolocation
  ) {
    this.productData = this.sharedSvc.productData;
    this.productLotData = this.sharedSvc.productLotData;
  }

  ngOnInit() {
    this.productiondate = '';
    this.exipredate = '';
    this.codeBar = '';
    if (this.productLotData != null) {
      this.sharedSvc.showLoader();
      this.fetchProductLotDetails();
      this.productLotDetails = '';
      this.productLotDetailsDataValue = [];
    } else {
      this.sharedSvc.showLoader();
      this.getDataProductByProdtIdProfileId();
      this.disablestatus = false;
      this.prductname = this.productData.name;
    }
  }

  getDataProductByProdtIdProfileId() {
    let params: any = {
      idproduct: this.productData.id,
      idprofile: 101,
    };
    let body = { params };
    this.apiDataBinding
      .getDataProductByProdtIdProfileId(body)
      .then((data) => {
        this.sharedSvc.dismissLoader();
        if (data.status == 200) {
          console.log(data.data);
          this.productLotDetails = data.data[0];
          this.productLotDetailsDataValue = this.productLotDetails.datavalues;
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
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
        this.prductname = this.productLotDetails.name;
        this.lotcode = this.productLotDetails.code_bar_lot;
        this.amountofunit = this.productLotDetails.amount;
        this.salesprice = '$' + this.productLotDetails.sale_value;
        this.valueeachunit = Number(
          this.productLotDetails.value_each_unit
        ).toFixed(3);
        this.productiondate = this.productLotDetails.production_date;
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
    if (!this.disablestatus) {
      if (this.networkSvc.status) {
        if (this.validateField()) {
          const popover = await this.modalCtrl.create({
            component: ViewDetailsPopupComponent,
            componentProps: {
              productLotDataValue: this.productLotDetailsDataValue,
              productionDate:
                this.productLotDetails.production_date != null
                  ? this.convertDate(this.productLotDetails.production_date)
                  : null,
            },
            cssClass: 'login-unlock-modal-class',
          });
          popover.onDidDismiss().then((data) => {
            if (data.data == true) {
              console.log(this.sharedSvc.viewDetailsModal);
              this.sharedSvc.showLoader();
              this.getCurrentLocation();
            }
          });
          return await popover.present();
        } else {
          this.toastSvc.show({
            message: 'Fill all the field',
            type: 'error',
          });
        }
      } else {
        this.toastSvc.show({
          message: ConstantService.message.noInternetConnection,
          type: 'error',
        });
      }
    } else {
      const popover = await this.modalCtrl.create({
        component: ViewDetailsPopupComponent,
        componentProps: {
          productLotDataValue: this.productLotDetailsDataValue,
          productionDate:
            this.productLotDetails.production_date != undefined
              ? this.convertDate(this.productLotDetails.production_date)
              : null,
        },
        cssClass: 'login-unlock-modal-class',
      });
      return await popover.present();
    }

    //production_date
  }

  validateField() {
    console.log(this.productiondate);
    if (
      this.codeBar != '' &&
      this.productiondate != '' &&
      this.exipredate != ''
    ) {
      return true;
    } else {
      return false;
    }
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

  productiondatevalue() {
    console.log(this.productiondate);
  }
  expiredatevalue() {
    console.log(this.exipredate);
  }
  countChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
  }

  prdCreateProductionLot() {
    let productionlot: any = {
      id_product: this.productData.id,
      qr_code_lot: null,
      code_bar_lot: this.codeBar,
      production_date: this.convertDate(this.productiondate),
      expiration_date: this.convertDate(this.exipredate),
    };
    let params = { productionlot };
    this.apiDataBinding
      .prdCreateProductionLot(params)
      .then((data) => {
        if (data.status == 200) {
          this.sharedSvc.dismissLoader();
          this.lotcode = data.data.id;
          console.log(data.data);
          this.createProducerQRCodeOperation();
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  createProducerQRCodeOperation() {
    this.sharedSvc.showLoader();
    let dataValue = this.sharedSvc.viewDetailsModal;
    for (let i = 0; i < dataValue.length; i++) {
      dataValue[i]['id_parent_data'] = '';
      dataValue[i]['id_parent_data'] = dataValue[i].id_group_data;
      delete dataValue[i].id_data_product;
      delete dataValue[i].id_group_data;
      delete dataValue[i].data_description;
      delete dataValue[i].type;
      delete dataValue[i].length;
      delete dataValue[i].parent_data_desc;
      delete dataValue[i].id_product;
      delete dataValue[i].id_profile;
    }
    this.apiDataBinding
      .createProducerQRCodeOperation(
        this.lotcode,
        this.lat,
        this.lng,
        dataValue
      )
      .then((data) => {
        if (data.status == 200 && data.data != null) {
          console.log(data.data);
          this.toastSvc.show({
            message: 'Data Saved Successfully',
            type: 'error',
          });
          this.sharedSvc.dismissLoader();
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
        this.toastSvc.show({
          message: ConstantService.message.somethingWentWrong,
          type: 'error',
        });
      });
  }

  getCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.prdCreateProductionLot();
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
}
