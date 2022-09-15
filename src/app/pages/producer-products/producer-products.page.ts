import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producer-products',
  templateUrl: './producer-products.page.html',
  styleUrls: ['./producer-products.page.scss'],
})
export class ProducerProductsPage implements OnInit {

  datas: any[];
  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
    this.datas = [
      {
        "image": "assets/images/mango.png",
        "name": "Organic Mango"
      },
      {
        "image": "assets/images/mango.png",
        "name": "Organic Coffee"
      },
      {
        "image": "assets/images/mango.png",
        "name": "Organic Strawberries"
      },
      {
        "image": "assets/images/mango.png",
        "name": "Organic Strawberries"
      }
    ]
  }

  goToHome() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  goToDistributor(){
    this.router.navigate(['my-distributor'], { replaceUrl: true })
  }

  goToNext() {
    this.router.navigate(['product-details']);
  }

}
