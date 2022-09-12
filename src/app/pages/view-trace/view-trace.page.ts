import { Component, OnInit } from '@angular/core';
import { ViewGeographyComponent } from 'src/app/pages/component/view-geography/view-geography.component';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-trace',
  templateUrl: './view-trace.page.html',
  styleUrls: ['./view-trace.page.scss'],
})
export class ViewTracePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async view() {
    const popover = await this.modalCtrl.create({
        component: ViewGeographyComponent,
        cssClass: 'login-unlock-modal-class',
        
    });
    return await popover.present();
}
}
