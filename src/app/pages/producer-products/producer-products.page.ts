import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Storage } from '@ionic/storage-angular';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-producer-products',
  templateUrl: './producer-products.page.html',
  styleUrls: ['./producer-products.page.scss'],
})
export class ProducerProductsPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;
  datas: any[];
  productList: any[];
  searchText: any;
  constructor(
    private toastSvc: ToastService,
    private router: Router,
    private storage: Storage,
    private apiDataBind: ApiDataBindService,
    private sharedSvc: SharedService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.sharedSvc.showLoader();
    this.storage
      .get(ConstantService.dbKey.userID)
      .then(async (userID) => {
        await this.getProductList(userID);
      })
      .catch((error) => {
        this.toastSvc.show({
          message: ConstantService.message.wentWrong,
          type: 'error',
        });
      });
  }

  goToHome() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  goToDistributor() {
    this.router.navigate(['my-distributor'], { replaceUrl: true });
  }

  goToNext(data) {
    this.sharedSvc.productData = data;
    this.router.navigate(['/product-details']);
  }

  goToReceiveLot() {
    this.router.navigate(['receive-lot']);
  }
  getProductList(userID) {
    this.apiDataBind
      .getProductList(userID)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.sharedSvc.dismissLoader();
          this.productList = data.data;
          this.datas = this.productList;
          console.log(this.productList);
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
        this.toastSvc.show({
          message: ConstantService.message.wentWrong,
          type: 'error',
        });
      });
  }

  search() {
    console.log(this.searchText);
    if (this.searchText == '') {
      this.datas = [];
      this.datas = this.productList;
    } else {
      // let data = this.countryObj
      this.datas = this.productList.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
      console.log(this.datas);
    }
  }

  logout() {
    this.popoverController.dismiss();
    this.storage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
