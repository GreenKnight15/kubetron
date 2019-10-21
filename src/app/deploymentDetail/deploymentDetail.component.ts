import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, PRIMARY_OUTLET, UrlTree, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { DeploymentService } from '../services/deployment.service';
import { AppsV1beta1Deployment } from '@kubernetes/client-node/dist/gen/model/AppsV1beta1Deployment';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-deploymentetail',
  templateUrl: './deploymentDetail.component.html',
  styleUrls: ['./deploymentDetail.component.css']
})
export class DeploymentDetailComponent implements OnInit, OnDestroy {

  // deployment: AppsV1beta1Deployment = new AppsV1beta1Deployment();
  deploymentStatus: AppsV1beta1Deployment;
  selectedNamespace: string;
  deploymentName;
  deploymentSubscription$;

  constructor(
    private router: Router,
    private deploymentService: DeploymentService,
    private cdr: ChangeDetectorRef,
    private _navService: NavService
  ) {

  }

  ngOnInit(): void  {
    this.setNamespace();
    this.requestDeployment(this.deploymentName, this.selectedNamespace);
    this.deploymentSubscription$ = this.deploymentService.deployment;
  }

  ngOnDestroy(): void {

  }


  requestDeployment(namespace: string, name: string) {
   // this.deploymentService.getNamespacedDeploymentByName(namespace,name);
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path;
    this.deploymentName = s[3].path;
  }
}
