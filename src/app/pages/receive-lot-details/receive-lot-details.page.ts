import { Component, OnInit } from '@angular/core';
import { RecievelotdetailpopupComponent } from 'src/app/pages/component/recievelotdetailpopup/recievelotdetailpopup.component';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receive-lot-details',
  templateUrl: './receive-lot-details.page.html',
  styleUrls: ['./receive-lot-details.page.scss'],
})
export class ReceiveLotDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }
  async view() {
    const popover = await this.modalCtrl.create({
      component: RecievelotdetailpopupComponent,
      cssClass: 'login-unlock-modal-class',

    });
    return await popover.present();
  }

  goToBack() {
    
  }

}
