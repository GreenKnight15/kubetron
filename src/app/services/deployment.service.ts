import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { AppsV1beta1Deployment } from '@kubernetes/client-node';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  deployments = new BehaviorSubject<AppsV1beta1Deployment[]>([]);
  deployment =  new BehaviorSubject<AppsV1beta1Deployment>(new AppsV1beta1Deployment());

  constructor(private readonly _ipc: ElectronService) {

    this._ipc.on('getDeploymentListResponse', (event, deploys: AppsV1beta1Deployment[]) => {
      console.log('getDeploymentListResponse received');
      this.deployments.next(deploys);
    });

    this._ipc.on('getNamespacedDeploymentByNameResponse', (event, deploy: AppsV1beta1Deployment) => {
      console.log('getNamespacedDeploymentByNameResponse received');
      this.deployment.next(deploy);
    });
  }

  public getNamespacedDeployments(namespace: string) {
    console.log('getDeploymentListRequest sent');
    this._ipc.send('getDeploymentListRequest', namespace);
  }

  public getNamespacedDeploymentByName(namespace: string, name: string) {
    console.log('getNamespacedDeploymentByNameRequest sent');
    this._ipc.send('getNamespacedDeploymentByNameRequest', namespace, name);
  }

}
