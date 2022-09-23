import { Injectable } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectivityService {

  networkListener: PluginListenerHandle;
  status: boolean;
  model = {};
  constructor() { }

  async listenNetwork() {
    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
    const status = await Network.getStatus();
    console.log('Network status:', status);
    console.log('Network status:', this.status);
  }

}
