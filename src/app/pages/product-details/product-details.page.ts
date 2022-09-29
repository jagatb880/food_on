import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productId: any;
  constructor(
    private _location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.productId = this.activeRouter.snapshot.paramMap;
    console.log(this.productId.params);
  }

  ngOnInit() {}

  goToBack() {
    this._location.back();
  }

  productLots() {
    this.router.navigate([
      'production-lot',
      { productId: this.productId.params.id },
    ]);
  }

  save() {}

  viewphoto() {}

  edit() {}
}
