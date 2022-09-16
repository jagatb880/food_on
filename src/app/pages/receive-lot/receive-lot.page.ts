import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-lot',
  templateUrl: './receive-lot.page.html',
  styleUrls: ['./receive-lot.page.scss'],
})
export class ReceiveLotPage implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  goToReceiveLotDetails() {
    this.router.navigate(['receive-lot-details'])
  }

}
