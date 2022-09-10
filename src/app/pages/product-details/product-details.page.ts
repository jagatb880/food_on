import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  productLots() {
    this.router.navigate(['production-lot']);
  }

}
