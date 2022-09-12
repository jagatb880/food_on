import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-details-popup',
  templateUrl: './view-details-popup.component.html',
  styleUrls: ['./view-details-popup.component.scss'],
})
export class ViewDetailsPopupComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  close()
  {
    this.modalCtrl.dismiss()
  }

}