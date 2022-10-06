import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-geographical-journey',
  templateUrl: './view-geographical-journey.page.html',
  styleUrls: ['./view-geographical-journey.page.scss'],
})
export class ViewGeographicalJourneyPage implements OnInit {
  @ViewChild('map') mapView: ElementRef;
  gMap: GoogleMap;
  allCoordinates: any[];
  markers: any[];

  constructor(
    private _location: Location,
    private sharedSvc: SharedService,
    private apiDataBinding: ApiDataBindService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.sharedSvc.showLoader();
    this.allCoordinates = [];
    this.getMyProductLotByProductID();
    this.createMap();
  }

  async createMap() {
    this.gMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapView.nativeElement, // reference to the capacitor-google-map element
      apiKey: environment.mapKey,
      forceCreate: true, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  }

  goToBack() {
    this._location.back();
  }

  getMyProductLotByProductID() {
    this.apiDataBinding
      .getMyProductLotByProductID(this.sharedSvc.productId)
      .then((data) => {
        if (data.status == 200) {
          this.sharedSvc.dismissLoader();
          this.collectCoordinates(data.data);
          console.log(data.data);
        }
      })
      .catch((error) => {
        this.sharedSvc.dismissLoader();
      });
  }

  collectCoordinates(data) {
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < data[i].qrcode_coordinates.length; j++) {
        this.allCoordinates.push(data[i].qrcode_coordinates[j]);
      }
    }
    console.log(this.allCoordinates);
    this.drawMarkersOnMap(this.allCoordinates);
  }

  drawMarkersOnMap(actualCoordinates) {
    this.markers = [];
    for (let i = 0; i < actualCoordinates.length; i++) {
      let coordinate = {
        lat: Number(actualCoordinates[i].n_coord),
        lng: Number(actualCoordinates[i].w_coord),
      };
      this.markers.push(coordinate);
      console.log(this.markers);
    }
    for (let i = 0; i < this.markers.length; i++) {
      const markerId = this.gMap.addMarker({
        coordinate: {
          lat: this.markers[i].lat,
          lng: this.markers[i].lng,
        },
      });
    }
    this.gMap.setCamera({
      zoom: 10,
      coordinate: {
        lat: this.markers[0].lat,
        lng: this.markers[0].lng,
      },
    });
  }
}
