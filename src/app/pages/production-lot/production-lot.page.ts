import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { Dialog } from '@capacitor/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-production-lot',
  templateUrl: './production-lot.page.html',
  styleUrls: ['./production-lot.page.scss'],
})
export class ProductionLotPage implements OnInit {
  datas: any[];
  product: any;

  constructor(
    private _location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private sharedSvc: SharedService,
    private apiDataBind: ApiDataBindService
  ) {
    // let paramData: any = this.activeRouter.snapshot.paramMap;
    this.product = this.sharedSvc.productData;
  }

  ngOnInit() {
    this.datas = [];
  }

  ionViewWillEnter() {
    if (this.product != null) this.getProductLotData();
  }

  getProductLotData() {
    this.sharedSvc.showLoader();
    this.apiDataBind
      .getMyProductLotByProductID(this.product.id)
      .then((productLotDatas) => {
        if (productLotDatas.status == 200) {
          console.log(productLotDatas);
          if (productLotDatas.data != null) {
            this.sharedSvc.dismissLoader();
            this.datas = productLotDatas.data;
          } else {
            this.sharedSvc.dismissLoader();
            this.showConfirm();
          }
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  goToBack() {
    this._location.back();
  }

  createnewlot() {
    this.sharedSvc.productLotData = null;
    this.router.navigate(['view-details']);
  }
  viewDetails(i) {
    this.sharedSvc.productLotData = this.datas[i];
    this.router.navigate(['view-details']);
  }

  viewQRCode(i) {
    this.sharedSvc.productLotData = this.datas[i];
    this.router.navigate(['my-qr-code']);
  }

  viewTrace(i) {
    this.sharedSvc.productLotData = this.datas[i];
    this.router.navigate(['view-trace']);
  }

  convertDate(date) {
    let isoDate = new Date(date);
    let newDate = isoDate.toISOString().substring(0, 10);
    let formatedDate =
      newDate.split('-')[2] +
      '/' +
      newDate.split('-')[1] +
      '/' +
      newDate.split('-')[0];
    return formatedDate;
  }

  showConfirm = async () => {
    const { value } = await Dialog.confirm({
      message: `No record found on this product`,
    });
    if (value == true) {
      this._location.back();
    }
  };
}
