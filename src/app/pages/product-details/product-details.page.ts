import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productData: any;
  constructor(
    private _location: Location,
    private router: Router,
    private sharedSvc: SharedService,
    private activeRouter: ActivatedRoute
  ) {
    // let paramData: any = this.activeRouter.snapshot.paramMap;
    this.productData = this.sharedSvc.productData;
  }

  ngOnInit() {}

  goToBack() {
    this._location.back();
  }

  productLots() {
    this.router.navigate(['/production-lot']);
  }

  save() {}

  viewphoto() {}

  edit() {}
}
