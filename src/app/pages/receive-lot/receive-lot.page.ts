import { Location } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-receive-lot',
  templateUrl: './receive-lot.page.html',
  styleUrls: ['./receive-lot.page.scss'],
})
export class ReceiveLotPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;
  constructor(private storage: Storage, public popoverController: PopoverController,private _location: Location, private router: Router,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  goToReceiveLotDetails() {
    this.router.navigate(['receive-lot-details'])
  }

  logout()
  {
    this.popoverController.dismiss()
    this.storage.clear();
    this.router.navigate(['login']);
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
