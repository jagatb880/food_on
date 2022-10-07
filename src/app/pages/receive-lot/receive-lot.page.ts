import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-receive-lot',
  templateUrl: './receive-lot.page.html',
  styleUrls: ['./receive-lot.page.scss'],
})
export class ReceiveLotPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;
  scanActive: boolean = false;
  constructor(
    private storage: Storage,
    public popoverController: PopoverController,
    private _location: Location,
    private router: Router,
    private sharedSvc: SharedService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.initialization();
  }

  async initialization() {
    await this.checkPermission();
    await this.startScanner();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        this.sharedSvc.scanedQrCode = result.content; //The QR content will come out here
        //Handle the data as your heart desires here
        this.stopScanner();
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.showBackground();
    document.querySelector('body').classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    this.scanActive = false;
    this.router.navigate(['receive-lot-details']);
  }

  goToBack() {
    this._location.back();
  }

  goToReceiveLotDetails() {
    this.router.navigate(['receive-lot-details']);
  }

  logout() {
    this.popoverController.dismiss();
    this.storage.clear();
    this.router.navigate(['login']);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
}
