import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { V1Pod } from '@kubernetes/client-node';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodService {

  pods = new BehaviorSubject<V1Pod[]>([]);

  constructor(private readonly _ipc: ElectronService) {
    this._ipc.on('getPodListResponse', (event, pods: V1Pod[]) => {
      console.log('getPodListResponse received');
      this.pods.next(pods);
    });
  }

  public getGetNamespacedPods(namespace: string) {
    console.log('getPodListRequest sent');
    this._ipc.send('getPodListRequest', namespace);
  }

}
