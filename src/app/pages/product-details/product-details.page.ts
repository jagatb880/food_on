import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
// import { ChartType, ChartOptions } from 'chart.js';
// import { Chart, ChartConfiguration, ChartEvent, ChartType ,ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// import * as Chart from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;
  constructor() { 
    this.lineChartMethod()
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Sell per week',
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
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          },
        ],
      },
    });
  }
  ngOnInit() {
  }

  // goToBack() {
  //   this._location.back();
  // }

  // productLots() {
  //   this.router.navigate(['production-lot']);
  // }

}
