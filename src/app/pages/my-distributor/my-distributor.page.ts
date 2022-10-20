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
  ToastController,
} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { Dialog } from '@capacitor/dialog';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-my-distributor',
  templateUrl: './my-distributor.page.html',
  styleUrls: ['./my-distributor.page.scss'],
})
export class MyDistributorPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;
  distributorList: any;
  searchText: any;
  datas: any[];
  constructor(
    public popoverController: PopoverController,
    private router: Router,
    private apiDataBind: ApiDataBindService,
    private storage: Storage,
    private sharedSvc: SharedService,
    private networkSvc: NetworkConnectivityService,
    private toastSvc: ToastService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.sharedSvc.showLoader();
    this.storage.get(ConstantService.dbKey.userID).then(async (userID) => {
      await this.getDistributorList(userID);
      // this.createMap();
    });
  }

  sendInvitation() {
    this.router.navigate(['send-invitation']);
  }

  search() {
    console.log(this.searchText);
    if (this.searchText == '') {
      this.datas = [];
      this.datas = this.distributorList;
    } else {
      this.datas = this.distributorList.filter(
        (item) =>
          item.nombre.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
      console.log(this.datas);
    }
  }

  goToHome() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  goToProduct() {
    this.router.navigate(['producer-products'], { replaceUrl: true });
  }

  goToReceiveLot() {
    this.router.navigate(['receive-lot']);
  }
  getDistributorList(userID) {
    this.apiDataBind
      .getDistributorList(userID)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.sharedSvc.dismissLoader();
          this.distributorList = data.data;
          console.log(this.distributorList);
          this.datas = this.distributorList;
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

  logout() {
    this.popoverController.dismiss();
    this.storage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  prompt = async (id) => {
    const { value } = await Dialog.confirm({
      message: `Are you sure to accept this invitation?`,
    });
    if (value == true) {
      if (this.networkSvc.status) {
        let params = {
          idUserWhoAccepts: this.sharedSvc.userId,
          idUserWhoInvites: id,
        };
        let body = { params };
        this.apiDataBind
          .acceptInvitation(body)
          .then((data) => {
            if (data.status == 200 && data.data == null) {
              this.toastSvc.show({
                message: data.message,
                type: 'error',
              });
            } else {
              this.sharedSvc.showLoader();
              this.getDistributorList(this.sharedSvc.userId);
            }
          })
          .catch((error) => {
            this.toastSvc.show({
              message: ConstantService.message.wentWrong,
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
  };
}
