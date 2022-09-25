import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  lineChart: any;
  bars: any;
  date: any;
  colorArray: any;
  enddate: any;
  segmentModel = 'all';
  secondgraph = false;
  map = true;
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
  year = new Date().getFullYear();
  yearRange = [];
  selectedYear: any;
  yearValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  constructor(
    private router: Router,
    private storage: Storage,
    private apiDataBind: ApiDataBindService
  ) {}

  ngOnInit() {
    var dta = new Date();
    console.log(dta);
    this.date = new Date().toISOString();
    this.enddate = new Date().toISOString();
    this.distributorData = '';
    this.yearRange.push(this.year);
    for (var i = 1; i < 20; i++) {
      this.yearRange.push(this.year - i);
    }
    // this.lineChartMethod();
  }

  ionViewWillEnter() {
    this.storage.get(ConstantService.dbKey.userID).then(async (userID) => {
      await this.getDistributorList(userID);
      await this.getProductList(userID);
    });
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }
  // ionViewDidEnter() {
  //   this.lineChartMethod();
  // }

  lineChartMethod() {
    this.third = true;
    this.thirdtext = false;
    this.secondtext = true;
    this.graphshow = true;
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'NOV',
          'DEC',
        ],
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
            data: [
              0, 2000, 2000, 4000, 4000, 6000, 6000, 8000, 8000, 10000, 0, 0,
            ],
            spanGaps: false,
          },
        ],
      },
    });
  }
  fastgraph() {
    if (this.third == true) {
      this.graphshow = true;
      this.lineChartMethod();
      this.third = false;
    } else {
      this.secondtext = false;
      this.thirdtext = false;
      this.graphshow = false;
      this.map = true;
      this.secondgraph = false;
      this.third = false;
      this.closerightarow = false;
    }
  }

  rightarow() {
    this.graphshow = true;
    this.map = false;
    this.secondgraph = true;
    if (this.third == true && this.map == false) {
      this.thirdtext = true;
      this.secondtext = false;
      this.closerightarow = true;
      this.graphshow = true;
      this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
        type: 'line',
        data: {
          labels: [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'NOV',
            'DEC',
          ],
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
              data: [0, 5, 10, 11, 4000, 6000, 6000, 8000, 8000, 10000, 0, 0],
              spanGaps: false,
            },
          ],
        },
      });
    } else {
      this.lineChartMethod();
    }
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

  ckeck() {
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
      debugger;
      console.log(data);
    });
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
}
