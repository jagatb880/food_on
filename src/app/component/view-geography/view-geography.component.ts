import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-geography',
  templateUrl: './view-geography.component.html',
  styleUrls: ['./view-geography.component.scss'],
})
export class ViewGeographyComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private storage: Storage, private router: Router,) { }

  ngOnInit() {}
  close()
  {
    this.modalCtrl.dismiss()
  }

  logout()
{
  this.storage.clear()
  this.router.navigate(['login']);
}
}
