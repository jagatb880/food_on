import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.page.html',
  styleUrls: ['./my-qr-code.page.scss'],
})
export class MyQrCodePage implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  scanQrCode() {
    this.router.navigate(['view-trace']);
  }

}
