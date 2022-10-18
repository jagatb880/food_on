import { Injectable } from '@angular/core';
import { IUserRegister } from '../interfaces/user-register';
import { AuthService } from './auth.service';
import { ConstantService } from './constant.service';
import { ILoginData } from '../interfaces/login-data';
import { Storage } from '@ionic/storage-angular';
import { IMyProductLotDetails } from '../interfaces/my-product-lot-details';
import { IQrCodeOperation } from '../interfaces/qr-code-operation';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataBindService {
  constructor(
    private authSvc: AuthService,
    private storage: Storage,
    private sharedSvc: SharedService
  ) {}

  getUserInfo() {
    let promise = new Promise<any>(async (resolve, reject) => {
      // await Preferences.get({ key: ConstantService.dbKey.userID }).then(userID=>{
      await this.storage
        .get(ConstantService.dbKey.userID)
        .then((userID) => {
          if (userID != null) {
            this.sharedSvc.userId = userID;
            resolve(userID);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  userRegister(userData: IUserRegister) {
    let promise = new Promise<any>((resolve, reject) => {
      let body = {
        nombre: userData.fullname,
        login: userData.fullname,
        contrasena: userData.password,
        email: userData.emailAddress,
      };
      this.authSvc.userRegister(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  forgotpass(email: String) {
    let promise = new Promise<any>((resolve, reject) => {
      let body = {
        email: email,
      };
      this.authSvc.forgotpass(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  loginData(userLogin: ILoginData) {
    let promise = new Promise<any>((resolve, reject) => {
      let usuariologin = {
        login: userLogin.login,
        password: userLogin.password,
      };
      let body = { usuariologin };
      this.authSvc.userLogin(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getDistributorList(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getDistributorList(id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getProductList(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getProductList(id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getDataForLineChart(qrparams) {
    let body = { qrparams };
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getDataForLineChart(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getMyProductLotByProductID(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getMyProductLotByProductID(id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getMyProductLotDetails(data: IMyProductLotDetails) {
    let promise = new Promise<any>((resolve, reject) => {
      let params = {
        id_production_lot: data.id_production_lot,
        id_user: data.id_user,
      };
      let body = { params };
      this.authSvc.getMyProductLotDetails(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getQRCodeOperByProdLotId(data: IQrCodeOperation) {
    let promise = new Promise<any>((resolve, reject) => {
      let qrcodeoperation = {
        id_production_lot: data.id_production_lot,
        id_user_received: data.id_user_received,
      };
      let body = { qrcodeoperation };
      this.authSvc.getQRCodeOperByProdLotId(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  createProducerQRCodeOperation(
    product_lot_id: any,
    lat: any,
    lng: any,
    dataValue: any[]
  ) {
    let promise = new Promise<any>((resolve, reject) => {
      let qrcodeoperation = {
        id_production_lot: product_lot_id,
        amount: 0,
        sale_value: 0,
        show_value_each_prod: 0,
        n_coord: lat,
        w_coord: lng,
        adddata: dataValue,
      };
      let body = { qrcodeoperation };
      this.authSvc.createProducerQRCodeOperation(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getQRCodeOperAllInfoByQRCodeOperId(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getQRCodeOperAllInfoByQRCodeOperId(id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  sendlotdata(body) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.sendlotdeta(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  prdCreateProductionLot(body) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.prdCreateProductionLot(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  usrGetUsuarioByEmail(email) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.usrGetUsuarioByEmail(email).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  getDataProductByProdtIdProfileId(body) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.getDataProductByProdtIdProfileId(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }

  acceptInvitation(body) {
    let promise = new Promise<any>((resolve, reject) => {
      this.authSvc.acceptInvitation(body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    return promise;
  }
}
