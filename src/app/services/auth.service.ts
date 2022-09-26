import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpService) {}

  userRegister(body): Observable<any> {
    return this.http.post(ConstantService.api.userRegister, body);
  }

  userLogin(body): Observable<any> {
    return this.http.post(ConstantService.api.userLogin, body);
  }

  getDistributorList(id): Observable<any> {
    return this.http.put(ConstantService.api.getDistributorList, id);
  }

  getProductList(id): Observable<any> {
    return this.http.put(ConstantService.api.getProductList, id);
  }

  getDataForLineChart(body): Observable<any> {
    return this.http.post(
      ConstantService.api.getTotalAmountByUserIDProdID,
      body
    );
  }

  getMyProductLotByProductID(id): Observable<any> {
    return this.http.put(ConstantService.api.getMyProductLotByProductID, id);
  }

  getMyProductLotDetails(body): Observable<any> {
    return this.http.post(ConstantService.api.getMyProductLotDetails, body);
  }

  getQRCodeOperByProdLotId(body): Observable<any> {
    return this.http.post(ConstantService.api.getQRCodeOperByProdLotId, body);
  }
}
