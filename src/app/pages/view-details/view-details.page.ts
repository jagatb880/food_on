import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { ViewDetailsPopupComponent } from 'src/app/pages/component/view-details-popup/view-details-popup.component';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async view() {
    const popover = await this.modalCtrl.create({
        component: ViewDetailsPopupComponent,
        cssClass: 'login-unlock-modal-class',
        
    });
    return await popover.present();
}

}
