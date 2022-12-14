export interface IApis {
  userRegister: string;
  userLogin: string;
  forgotpass: string;
  getDistributorList: string;
  getProductList: string;
  getTotalAmountByUserIDProdID: string;
  getMyProductLotByProductID: string;
  getMyProductLotDetails: string;
  getQRCodeOperByProdLotId: string;
  createProducerQRCodeOperation: string;
  getQRCodeOperAllInfoByQRCodeOperId: string;
  qrcodeopeoperation: string;
  prdCreateProductionLot: string;
  usrGetUsuarioByEmail: string;
  getDataProductByProdtIdProfileId: string;
  acceptInvitation: string;
  sentInvitation: string;
}
