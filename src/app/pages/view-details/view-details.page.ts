import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { ViewDetailsPopupComponent } from 'src/app/component/view-details-popup/view-details-popup.component';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {

  constructor(private _location: Location, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  async view() {
    const popover = await this.modalCtrl.create({
      component: ViewDetailsPopupComponent,
      cssClass: 'login-unlock-modal-class',
    });
    return await popover.present();
  }
}
