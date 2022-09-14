import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-distributor',
  templateUrl: './my-distributor.page.html',
  styleUrls: ['./my-distributor.page.scss'],
})
export class MyDistributorPage implements OnInit {
  distrubutionarray: { name: string; invitation: string; color: string; }[];

  constructor() { 
    this.distrubutionarray =[{'name':'El Agrario','invitation':'SUBMITTED','color':'#f28a5f'},
    {'name':'International Distributor','invitation':'accepted','color':'#35d097'},
    {'name':'Cosmic INC','invitation':'RECEIVED','color':'#ffd445'}]
  }

  ngOnInit() {
  }

}
