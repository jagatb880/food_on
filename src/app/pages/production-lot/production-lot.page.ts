import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production-lot',
  templateUrl: './production-lot.page.html',
  styleUrls: ['./production-lot.page.scss'],
})
export class ProductionLotPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }



}
