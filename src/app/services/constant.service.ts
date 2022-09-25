import { Injectable } from '@angular/core';
import { IApis } from '../interfaces/api';
import { IDbKeyNames } from '../interfaces/db-key-names';
import { IMessages } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  static baseUrl: string = 'http://tagtrace.ca:4000/';
  constructor() {}

  static api: IApis = {
    userRegister: 'usrCreateUsuario',
    userLogin: 'usrLoginUsuario',
    getDistributorList: 'GeDistributorsNetworkByUserId',
    getProductList: 'prdGetProductByUserId',
    getTotalAmountByUserIDProdID: 'GetTotalAmountByUserIDProdID',
  };

  static message: IMessages = {
    checkInternetConnection: 'Please check your internet connection.',
    noInternetConnection: 'No internet connection',
    internetOrLocationOff: 'Internet or GPS Location is off.',
    serverError: 'Error connecting to server ! Please try after some time.',
    networkError: 'Server error.',
    pleaseWait: 'Please wait..',
    validUserName: 'Please enter username.',
    validPassword: 'Please enter Password.',
    authentication: 'Authenticating user, please wait...',
    wentWrong: 'Something went wrong, try after some times.',
    somethingWentWrong: 'Something went Wrong!',
    fetchUserDetails: 'Fetching user details, please wait...',
    warning: 'Warning',
    info: 'Info',
    ok: 'Ok',
    cancel: 'Cancel',
  };

  static dbKey: IDbKeyNames = {
    userID: 'userID',
  };
}
