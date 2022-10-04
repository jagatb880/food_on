import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-view-details-popup',
  templateUrl: './view-details-popup.component.html',
  styleUrls: ['./view-details-popup.component.scss'],
})
export class ViewDetailsPopupComponent implements OnInit {
  productLotDataValue;
  productionDate;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    console.log(this.productLotDataValue);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.modalCtrl.dismiss();
    this.router.navigate(['my-qr-code']);
  }
}
