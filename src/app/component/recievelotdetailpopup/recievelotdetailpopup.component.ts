import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recievelotdetailpopup',
  templateUrl: './recievelotdetailpopup.component.html',
  styleUrls: ['./recievelotdetailpopup.component.scss'],
})
export class RecievelotdetailpopupComponent implements OnInit {
  releventdata;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.releventdata)
  }

  close()
  {
    this.modalCtrl.dismiss()
  }

}
