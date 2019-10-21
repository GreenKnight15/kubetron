import { Injectable } from '@angular/core';
import { V1Service } from '@kubernetes/client-node/dist/gen/model/v1Service';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

services = new BehaviorSubject<V1Service[]>([]);

constructor(
  // tslint:disable-next-line: variable-name
  private readonly _electronService: ElectronService
) {
  this._electronService.ipcRenderer.on('getServiceListResponse', (event, services: V1Service[]) => {
    console.log('getServiceListResponse received');
    this.services.next(services);
  });
 }

 public getGetNamespacedService(namespace: string) {
  console.log('getServiceListRequest sent');
  this._electronService.ipcRenderer.send('getServiceListRequest', namespace);
}


}
