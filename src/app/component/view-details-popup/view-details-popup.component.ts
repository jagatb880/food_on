import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-details-popup',
  templateUrl: './view-details-popup.component.html',
  styleUrls: ['./view-details-popup.component.scss'],
})
export class ViewDetailsPopupComponent implements OnInit {
  productLotDataValue;
  productionDate;
  location: any;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    console.log(this.productLotDataValue);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.modalCtrl.dismiss();
  }
}
