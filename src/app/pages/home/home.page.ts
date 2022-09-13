import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  lineChart: any;
  bars: any;
  colorArray: any;
  segmentModel = 'all';
  secondgraph = false;
  map = true
  third = false
  closerightarow = false;
  graphshow = false
  secondtext = false
  thirdtext = false;
  constructor(private router: Router) { }

  ngOnInit() {
    // this.lineChartMethod();
  }

  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }
  // ionViewDidEnter() {
  //   this.lineChartMethod();
  // }

  lineChartMethod() {
    this.third = true
    this.thirdtext = false;
    this.secondtext = true
    this.graphshow = true
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
            data: [0, 2000, 2000, 4000, 4000, 6000, 6000, 8000, 8000, 10000, 0, 0],
            spanGaps: false,
          },
        ],
      },
    });
  }
  fastgraph() {
    if (this.third == true) {

      this.graphshow = true
      this.lineChartMethod()
      this.third = false
    }
    else {
      this.secondtext = false
      this.thirdtext = false
      this.graphshow = false
      this.map = true
      this.secondgraph = false
      this.third = false
      this.closerightarow = false
    }
  }

  rightarow() {
    this.graphshow = true
    this.map = false;
    this.secondgraph = true
    if (this.third == true && this.map == false) {
      this.thirdtext = true
      this.secondtext = false
      this.closerightarow = true;
      this.graphshow = true
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
    }
    else {

      this.lineChartMethod()
    }

  }
  goToProduct() {
    this.router.navigate(['producer-products'], { replaceUrl: true })
  }

}
