import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';

@Component({
  selector: 'app-production-lot',
  templateUrl: './production-lot.page.html',
  styleUrls: ['./production-lot.page.scss'],
})
export class ProductionLotPage implements OnInit {
  datas: any[];
  productId: any;

  constructor(
    private _location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private apiDataBind: ApiDataBindService
  ) {
    this.productId = this.activeRouter.snapshot.paramMap.get('productId');
    console.log(this.productId);
  }

  ngOnInit() {
    this.datas = [];
  }

  ionViewWillEnter() {
    if (this.productId != null) this.getProductLotData();
  }

  getProductLotData() {
    this.apiDataBind
      .getMyProductLotByProductID(this.productId)
      .then((productLotDatas) => {
        if (productLotDatas.status == 200) {
          console.log(productLotDatas);
          this.datas = productLotDatas.data;
        }
      });
  }

  goToBack() {
    this._location.back();
  }

  viewDetails() {
    this.router.navigate(['view-details']);
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
}
