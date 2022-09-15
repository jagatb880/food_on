import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-geographical-journey',
  templateUrl: './view-geographical-journey.page.html',
  styleUrls: ['./view-geographical-journey.page.scss'],
})
export class ViewGeographicalJourneyPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

}
