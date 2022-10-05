import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Storage } from '@ionic/storage-angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ViewGeographyComponent } from 'src/app/component/view-geography/view-geography.component';
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  @ViewChild('map') mapView: ElementRef;
  @ViewChild('popover') popover;
  isOpen = false;
  gMap: GoogleMap;

  lineChart: any;
  bars: any;
  date: any;
  colorArray: any;
  enddate: any;
  segmentModel = 'all';
  secondgraph = false;
  mapSec = true;
  third = false;
  closerightarow = false;
  graphshow = false;
  secondtext = false;
  thirdtext = false;
  userID: any;
  distributorList: any;
  distributorData: any;
  productList: any;
  productData: any;
  dateshow = false;
  thirdgraph = false;
  year = new Date().getFullYear();
  yearRange = [];
  lastgrph = false;
  selectedYear: any;
  selectedMonth: any;
  chartdeta: any;
  charttotalamount: any[];
  charttotalsale: any[];
  chartmonth: any[];
  monthList: any[];
  qrcodeCoordinates: any[];
  actualCoordinates: any[];
  markers: any[];
  constructor(
    private router: Router,
    private storage: Storage,
    private toastSvc: ToastService,
    private networkSvc: NetworkConnectivityService,
    private apiDataBind: ApiDataBindService,
    private modalCtrl: ModalController,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    var dta = new Date();
    console.log(dta);
    this.date = new Date().toISOString();
    this.enddate = new Date().toISOString();
    this.distributorData = '';
    this.productData = '';
    this.selectedYear = '';
    this.selectedMonth = '';
    this.yearRange.push(this.year);
    for (var i = 1; i < 20; i++) {
      this.yearRange.push(this.year - i);
    }
    this.monthList = [
      {
        month: 'January',
        monthId: 1,
      },
      {
        month: 'February',
        monthId: 2,
      },
      {
        month: 'March',
        monthId: 3,
      },
      {
        month: 'April',
        monthId: 4,
      },
      {
        month: 'May',
        monthId: 5,
      },
      {
        month: 'Jun',
        monthId: 6,
      },
      {
        month: 'July',
        monthId: 7,
      },
      {
        month: 'August',
        monthId: 8,
      },
      {
        month: 'September',
        monthId: 9,
      },
      {
        month: 'October',
        monthId: 10,
      },
      {
        month: 'November',
        monthId: 11,
      },
      {
        month: 'December',
        monthId: 12,
      },
    ];
    // this.lineChartMethod();
  }

  ionViewWillEnter() {
    this.storage.get(ConstantService.dbKey.userID).then(async (userID) => {
      await this.getDistributorList(userID);
      await this.getProductList(userID);
      this.createMap();
    });
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

  handleChange(event) {
    this.gMap.destroy();
  }

  ionViewWillLeave() {
    this.gMap.destroy().then((data) => {
      console.log(data);
    });
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }

  secondchart() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartmonth,
        datasets: [
          {
            label: '',
            //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.charttotalamount,
            spanGaps: false,
          },
        ],
      },
    });
  }
  lineChartMethod() {
    // alert('2nd')
    this.third = true;
    this.thirdtext = false;
    this.lastgrph = true;
    this.secondtext = true;
    this.graphshow = true;
    this.secondchart();
  }
  fastgraph() {
    if (this.thirdgraph == true) {
      this.graphshow = true;
      this.thirdgraph = false;
      this.lineChartMethod();
      // this.thirdgrapg()
      this.third = false;
      this.mapSec = false;
      this.closerightarow = false;
    } else {
      this.secondtext = false;
      this.thirdtext = false;
      this.graphshow = false;
      this.mapSec = true;
      this.secondgraph = false;
      this.third = false;
      this.closerightarow = false;
    }
  }

  rightarow() {
    this.graphshow = true;
    this.mapSec = false;
    this.secondgraph = true;
    if (this.third == true && this.mapSec == false) {
      this.thirdtext = true;
      this.secondtext = false;
      this.closerightarow = true;
      this.graphshow = true;
      // alert('3rd')
      this.thirdgraph = true;
      this.thirdgrapg();
    } else {
      this.lineChartMethod();
    }
  }

  thirdgrapg() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartmonth,
        datasets: [
          {
            label: '',
            //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.charttotalsale,
            spanGaps: false,
          },
        ],
      },
    });
  }
  getDistributorList(userID) {
    this.apiDataBind.getDistributorList(userID).then((data) => {
      console.log(data);
      if (data.status == 200) {
        this.distributorList = data.data;
      }
    });
  }

  getProductList(userID) {
    this.apiDataBind.getProductList(userID).then((data) => {
      console.log(data);
      if (data.status == 200) {
        this.productList = data.data;
      }
    });
  }

  goToProduct() {
    this.router.navigate(['producer-products'], { replaceUrl: true });
  }
  goToDistributor() {
    this.router.navigate(['my-distributor'], { replaceUrl: true });
  }
  goToReceiveLot() {
    this.router.navigate(['receive-lot']);
  }

  openDatePicker() {
    this.dateshow = true;
    // DatePickerPlugin.present({
    //   mode: 'date',
    //   locale: 'pt_BR',
    //   date: '13/07/2019',
    //   theme: selectedTheme,
    //   format: 'dd/MM/yyyy',
    // }).then((date) => alert(date.value));
  }

  startdatevalue() {
    console.log(this.date);
  }
  enddatevalue() {
    console.log(this.enddate);
  }

  check() {
    if (this.networkSvc.status) {
      if (this.mapSec) {
        if (this.distributorData == '') {
          this.toastSvc.show({
            message: 'Select one producer',
            type: 'error',
          });
        } else if (this.productData == '') {
          this.toastSvc.show({
            message: 'Select one product',
            type: 'error',
          });
        } else if (this.selectedYear == '') {
          this.toastSvc.show({
            message: 'Select the year',
            type: 'error',
          });
        } else if (this.selectedMonth == '') {
          this.toastSvc.show({
            message: 'Select the month',
            type: 'error',
          });
        } else {
          this.qrcodeCoordinates = [];
          this.actualCoordinates = [];
          this.createMap();
          this.apiDataBind
            .getMyProductLotByProductID(this.productData)
            .then((resultData) => {
              if (resultData.status == 200 && resultData.data != null) {
                for (let i = 0; i < resultData.data.length; i++) {
                  if (resultData.data[i].qrcode_coordinates.length > 0) {
                    for (
                      let j = 0;
                      j < resultData.data[i].qrcode_coordinates.length;
                      j++
                    ) {
                      resultData.data[i].qrcode_coordinates[j].register_date =
                        this.convertDate(
                          resultData.data[i].qrcode_coordinates[j].register_date
                        );
                      this.qrcodeCoordinates.push(
                        resultData.data[i].qrcode_coordinates[j]
                      );
                    }
                  }
                }
                for (let i = 0; i < this.qrcodeCoordinates.length; i++) {
                  if (
                    this.qrcodeCoordinates[i].register_date.split('/')[0] ==
                      this.selectedYear &&
                    this.qrcodeCoordinates[i].register_date.split('/')[1] ==
                      this.selectedMonth
                  ) {
                    this.actualCoordinates.push(this.qrcodeCoordinates[i]);
                  }
                }
                console.log(this.actualCoordinates);
                if (this.actualCoordinates.length == 0) {
                  this.toastSvc.show({
                    message: 'No Match Data Found',
                    type: 'error',
                  });
                } else {
                  this.drawMarkersOnMap();
                }
              } else {
                this.toastSvc.show({
                  message: 'No Data Found',
                  type: 'error',
                });
              }
            });
        }
      } else {
        if (this.distributorData == '') {
          this.toastSvc.show({
            message: 'Select one producer',
            type: 'error',
          });
        } else if (this.productData == '') {
          this.toastSvc.show({
            message: 'Select one product',
            type: 'error',
          });
        } else {
          let qrparams = {
            id_user_received: this.distributorData,
            id_product: this.productData,
            inidate: this.convertDate(this.date),
            finaldate: this.convertDate(this.enddate),
          };
          // let qrparams = {
          //   id_user_received: 10,
          //   id_product: 20,
          //   inidate: '2022/01/01',
          //   finaldate: '2022/12/31',
          // };
          this.apiDataBind.getDataForLineChart(qrparams).then((data) => {
            console.log(data);
            this.chartdeta = data.data;
            this.charttotalamount = [];
            this.charttotalsale = [];
            this.chartmonth = [];
            for (var i = 0; i < this.chartdeta.length; i++) {
              if (this.chartdeta[i]) {
                this.charttotalamount.push(this.chartdeta[i].total_amount);
                this.charttotalsale.push(this.chartdeta[i].total_sale);
                this.chartmonth.push(this.chartdeta[i].month_sent);
                console.log(this.charttotalamount);
              }
            }
            this.secondchart();
          });
        }
      }
    } else {
      this.toastSvc.show({
        message: ConstantService.message.noInternetConnection,
        type: 'error',
      });
    }
  }

  drawMarkersOnMap() {
    this.markers = [];
    for (let i = 0; i < this.actualCoordinates.length; i++) {
      let coordinate = {
        lat: Number(this.actualCoordinates[i].n_coord),
        lng: Number(this.actualCoordinates[i].w_coord),
      };
      // let LatLong = { coordinate };
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
      zoom: 8,
      coordinate: {
        lat: this.markers[0].lat,
        lng: this.markers[0].lng,
      },
    });
    // this.gMap.getMapBounds().then((data) => {
    //   console.log(data);
    // });
  }

  convertDate(date) {
    let isoDate = new Date(date);
    let newDate = isoDate.toISOString().substring(0, 10);
    let formatedDate =
      newDate.split('-')[0] +
      '/' +
      newDate.split('-')[1] +
      '/' +
      newDate.split('-')[2];
    return formatedDate;
  }

  logout() {
    this.popoverController.dismiss();
    this.storage.clear();
    this.router.navigate(['login']);
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
