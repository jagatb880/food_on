import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-lot',
  templateUrl: './production-lot.page.html',
  styleUrls: ['./production-lot.page.scss'],
})
export class ProductionLotPage implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  viewDetails() {
    this.router.navigate(['view-details']);
  }

}
