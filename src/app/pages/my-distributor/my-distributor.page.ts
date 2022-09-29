import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-my-distributor',
  templateUrl: './my-distributor.page.html',
  styleUrls: ['./my-distributor.page.scss'],
})
export class MyDistributorPage implements OnInit {
  distrubutionarray: { name: string; invitation: string; color: string; }[];
  distributorList: any;
  searchText: any;
  datas: any[];
  constructor(private router: Router, private apiDataBind: ApiDataBindService,private storage: Storage,) {
    this.distrubutionarray = [{ 'name': 'El Agrario', 'invitation': 'SUBMITTED', 'color': '#f28a5f' },
    { 'name': 'International Distributor', 'invitation': 'accepted', 'color': '#35d097' },
    { 'name': 'Cosmic INC', 'invitation': 'RECEIVED', 'color': '#ffd445' }]
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
      // let data = this.countryObj
      this.datas = this.distributorList.filter((item) =>
        item.nombre.toLowerCase().startsWith(this.searchText)
      );
      console.log(this.datas);
    }
  }

  goToHome() {
    this.router.navigate(['home'], { replaceUrl: true })
  }

  goToProduct() {
    this.router.navigate(['producer-products'], { replaceUrl: true })
  }

  goToReceiveLot(){
    this.router.navigate(['receive-lot'])
  }
  getDistributorList(userID) {
    this.apiDataBind.getDistributorList(userID).then((data) => {
      console.log(data);
      if (data.status == 200) {
        this.distributorList = data.data;
        console.log(this.distributorList)
        this.datas = this.distributorList;
      }
    });
  }
}
