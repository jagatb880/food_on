import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-lot',
  templateUrl: './production-lot.page.html',
  styleUrls: ['./production-lot.page.scss'],
})
export class ProductionLotPage implements OnInit {

  datas: any[];
  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
    this.datas = [
      {
        "date": "08-Aug-2022",
        "price": "210.00",
        "letcode": "65910",
        "amount": "14.50",
        "level": "01",
      },
      {
        "date": "08-Aug-2022",
        "price": "210.00",
        "letcode": "65910",
        "amount": "14.50",
        "level": "01",
      },
      {
        "date": "08-Aug-2022",
        "price": "210.00",
        "letcode": "65910",
        "amount": "14.50",
        "level": "01",
      }
    ];
  }

  goToBack() {
    this._location.back();
  }

  viewDetails() {
    this.router.navigate(['view-details']);
  }

}
