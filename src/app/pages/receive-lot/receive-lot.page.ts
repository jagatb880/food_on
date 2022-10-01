import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-receive-lot',
  templateUrl: './receive-lot.page.html',
  styleUrls: ['./receive-lot.page.scss'],
})
export class ReceiveLotPage implements OnInit {

  constructor(private _location: Location, private router: Router,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  goToReceiveLotDetails() {
    this.router.navigate(['receive-lot-details'])
  }

  async profileicon() {
    const popover = await this.modalCtrl.create({
      component: ViewGeographyComponent,
      cssClass: 'login-unlock-modal-class',

    });
    return await popover.present();
  }
}
