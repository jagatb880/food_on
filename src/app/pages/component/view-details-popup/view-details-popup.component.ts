import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-details-popup',
  templateUrl: './view-details-popup.component.html',
  styleUrls: ['./view-details-popup.component.scss'],
})
export class ViewDetailsPopupComponent implements OnInit {

  datas: any[]
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.datas = [
      {
        "public": false,
        "description": "Value each unit",
        "value": "$0.75"
      },
      {
        "public": false,
        "description": "Fertilizer supp.name",
        "value": "Eoco unit"
      },
      {
        "public": false,
        "description": "Planning date",
        "value": "2021/11/03"
      },
      {
        "public": false,
        "description": "Fertilizer Type",
        "value": "Organic bayer"
      },
    ]
  }

  close() {
    this.modalCtrl.dismiss()
  }

}
