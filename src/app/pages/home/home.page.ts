import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  segmentModel = 'all';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }

  goToProduct() {
    this.router.navigate(['producer-products'])
  }

}
