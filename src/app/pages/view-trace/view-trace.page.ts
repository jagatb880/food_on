import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';

@Component({
  selector: 'app-view-trace',
  templateUrl: './view-trace.page.html',
  styleUrls: ['./view-trace.page.scss'],
})
export class ViewTracePage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router, private _location: Location) { }

  ngOnInit() { }

  async view() {
    const popover = await this.modalCtrl.create({
      component: ViewGeographyComponent,
      cssClass: 'login-unlock-modal-class',

    });
    return await popover.present();
  }

  goToBack() {
    this._location.back();
  }

  viewGeographicalJourney() {
    this.router.navigate(['view-geographical-journey']);
  }
}
