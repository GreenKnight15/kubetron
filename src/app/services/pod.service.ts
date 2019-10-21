import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject } from 'rxjs';
import { V1Pod } from '@kubernetes/client-node/dist/gen/model/V1Pod';

@Injectable({
  providedIn: 'root'
})
export class PodService {
  pods = new BehaviorSubject<V1Pod[]>([]);
// tslint:disable-next-line: variable-name
constructor(private _electronService: ElectronService) {
    this._electronService.ipcRenderer.on('getPodListResponse', (event, pods: V1Pod[]) => {
      console.log('getPodListResponse received');
      this.pods.next(pods);
    });
  }

  public getGetNamespacedPods(namespace: string) {
    console.log('getPodListRequest sent');
    this._electronService.ipcRenderer.send('getPodListRequest', namespace);
  }

}
