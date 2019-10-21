import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AppsV1beta1Deployment } from '@kubernetes/client-node/dist/gen/model/AppsV1beta1Deployment';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  deployments = new BehaviorSubject<AppsV1beta1Deployment[]>([]);
  deployment =  new BehaviorSubject<AppsV1beta1Deployment>(new AppsV1beta1Deployment());

  // tslint:disable-next-line: variable-name
  constructor(private readonly _electronService: ElectronService) {

    this._electronService.ipcRenderer.on('getDeploymentListResponse', (event, deploys: AppsV1beta1Deployment[]) => {
      console.log('getDeploymentListResponse received');
      this.deployments.next(deploys);
    });

    this._electronService.ipcRenderer.on('getNamespacedDeploymentByNameResponse', (event, deploy: AppsV1beta1Deployment) => {
      console.log('getNamespacedDeploymentByNameResponse received');
      this.deployment.next(deploy);
    });
  }

  public getNamespacedDeployments(namespace: string) {
    console.log('getDeploymentListRequest sent');
    this._electronService.ipcRenderer.send('getDeploymentListRequest', namespace);
  }

  public getNamespacedDeploymentByName(namespace: string, name: string) {
    console.log('getNamespacedDeploymentByNameRequest sent');
    this._electronService.ipcRenderer.send('getNamespacedDeploymentByNameRequest', namespace, name);
  }

}
