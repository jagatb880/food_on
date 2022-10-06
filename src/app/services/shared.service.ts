import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  productData: any;
  productLotData: any;
  loading: any;
  userId: any;
  productId: any;
  constructor(private loadingCtrl: LoadingController) {}

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    this.loading.present();
  }

  dismissLoader() {
    this.loading.dismiss();
  }
}
