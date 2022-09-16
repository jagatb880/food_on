import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  viewdata = false;
  constructor(private _location: Location, private router: Router) {
  }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

  productLots() {
    this.router.navigate(['production-lot']);
  }

  save() {

  }

  viewphoto()
  {
    this.viewdata = true
  }

  edit() {

  }

}
