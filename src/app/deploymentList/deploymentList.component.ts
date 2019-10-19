import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AppsV1beta1Deployment } from '@kubernetes/client-node';
import { UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET, Router } from '@angular/router';
import { ElectronService } from '../services/electron.service';
import { DeploymentService } from '../services/deployment.service';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deploymentList.component.html',
  styleUrls: ['./deploymentList.component.css']
})
export class DeploymentListComponent implements OnInit, OnChanges {

  selectedNamespace;
  deployments: AppsV1beta1Deployment[];
  selectedDeployment: AppsV1beta1Deployment;
  deploymentSubscription$;

  constructor(
    private router: Router,
    private readonly _ipc: ElectronService,
    private deploymentService: DeploymentService,
    private cdr: ChangeDetectorRef)
    {
      this.setNamespace();
    }

    ngOnInit(): void  {
      console.log(this.selectedNamespace);

      this.deploymentSubscription$ = this.deploymentService.deployments.subscribe((value) => {
        this.deployments = value;
        this.cdr.detectChanges();
      });
      this.requestDeployments(this.selectedNamespace);
    }

  ngOnChanges(): void {
    this.setNamespace();
  }

  requestDeployments(namespace: string) {
    this.deploymentService.getNamespacedDeployments(namespace);
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    this.deploymentSubscription$.unsubscribe();
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path;
  }
}
