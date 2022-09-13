import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producer-products',
  templateUrl: './producer-products.page.html',
  styleUrls: ['./producer-products.page.scss'],
})
export class ProducerProductsPage implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToNext() {
    this.router.navigate(['product-details']);
  }

}
