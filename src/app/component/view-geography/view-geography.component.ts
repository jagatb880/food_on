import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-view-geography',
  templateUrl: './view-geography.component.html',
  styleUrls: ['./view-geography.component.scss'],
})
export class ViewGeographyComponent implements OnInit {
  producerData: any;
  location: any;
  constructor(
    private modalCtrl: ModalController,
    private nativeGeocoder: NativeGeocoder
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(
        this.producerData.n_coord,
        this.producerData.w_coord,
        options
      )
      .then((result: NativeGeocoderResult[]) => {
        this.location = result[0].countryName;
        console.log(this.location);
      })
      .catch((error: any) => console.log(error));
  }

  close() {
    this.modalCtrl.dismiss(false);
  }

  view() {
    this.modalCtrl.dismiss(true);
  }
}
