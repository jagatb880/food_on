import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  segmentModel = 'all';
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }

}
