import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-producer-products',
  templateUrl: './producer-products.page.html',
  styleUrls: ['./producer-products.page.scss'],
})
export class ProducerProductsPage implements OnInit {
  datas: any[];
  productList: any[];
  searchText: any;
  constructor(
    private _location: Location,
    private router: Router,
    private storage: Storage,
    private apiDataBind: ApiDataBindService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.storage.get(ConstantService.dbKey.userID).then(async (userID) => {
      await this.getProductList(userID);
    });
  }

  goToHome() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  goToDistributor() {
    this.router.navigate(['my-distributor'], { replaceUrl: true });
  }

  goToNext(data) {
    this.router.navigate(['product-details',data], {
      skipLocationChange: true,
    });
  }

  goToReceiveLot() {
    this.router.navigate(['receive-lot']);
  }
  getProductList(userID) {
    this.apiDataBind.getProductList(userID).then((data) => {
      console.log(data);
      if (data.status == 200) {
        this.productList = data.data;
        this.datas = this.productList;
        console.log(this.productList);
      }
    });
  }

  search() {
    console.log(this.searchText);
    if (this.searchText == '') {
      this.datas = [];
      this.datas = this.productList;
    } else {
      // let data = this.countryObj
      this.datas = this.productList.filter((item) =>
        item.name.toLowerCase().startsWith(this.searchText)
      );
      console.log(this.datas);
    }
  }
}
