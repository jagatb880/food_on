import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConstantService } from 'src/app/services/constant.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-details-popup',
  templateUrl: './view-details-popup.component.html',
  styleUrls: ['./view-details-popup.component.scss'],
})
export class ViewDetailsPopupComponent implements OnInit {
  productLotDataValue;
  productionDate;
  location: any;
  constructor(
    private modalCtrl: ModalController,
    private toastSvc: ToastService,
    private sharedSvc: SharedService
  ) {}

  ngOnInit() {
    console.log(this.productLotDataValue);
    if (this.productLotDataValue[0].description == undefined) {
      for (let i = 0; i < this.productLotDataValue.length; i++) {
        this.productLotDataValue[i]['value'] = '';
        if (
          this.productLotDataValue[i].data_description
            .toLowerCase()
            .includes('date')
        ) {
          this.productLotDataValue[i]['input'] = 'date';
        } else {
          this.productLotDataValue[i]['input'] = 'text';
        }
      }
    }
    console.log(this.productLotDataValue);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.productLotDataValue[0].description == undefined) {
      if (this.validateBlankOrNot()) {
        this.sharedSvc.viewDetailsModal = this.productLotDataValue;
        this.modalCtrl.dismiss(true);
      } else {
        this.toastSvc.show({
          message: 'Fill all the field',
          type: 'error',
        });
      }
    } else {
      this.modalCtrl.dismiss();
    }
  }

  validateBlankOrNot() {
    let count = 0;
    for (let i = 0; i < this.productLotDataValue.length; i++) {
      if (this.productLotDataValue[i].value != '') {
        count++;
      }
    }
    if (count == this.productLotDataValue.length) {
      return true;
    } else {
      return false;
    }
  }
}
