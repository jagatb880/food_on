import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-geography',
  templateUrl: './view-geography.component.html',
  styleUrls: ['./view-geography.component.scss'],
})
export class ViewGeographyComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  close()
  {
    this.modalCtrl.dismiss()
  }
}
