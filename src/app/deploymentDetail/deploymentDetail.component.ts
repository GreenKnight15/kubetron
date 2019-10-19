import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppsV1beta1Deployment  } from '@kubernetes/client-node';
import { Router, PRIMARY_OUTLET, UrlTree, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { DeploymentService } from '../services/deployment.service';

@Component({
  selector: 'app-deploymentetail',
  templateUrl: './deploymentDetail.component.html',
  styleUrls: ['./deploymentDetail.component.css']
})
export class DeploymentDetailComponent implements OnInit {

  deployment: AppsV1beta1Deployment;
  deploymentStatus: AppsV1beta1Deployment;
  selectedNamespace: string;
  deploymentName;
  deploymentSubscription$;

  constructor(private router: Router, private deploymentService: DeploymentService, private cdr: ChangeDetectorRef) {
    this.deploymentSubscription$ = this.deploymentService.deployment.subscribe((value) => {
      this.deployment = value;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void  {
    this.setNamespace();
    this.requestDeployment(this.selectedNamespace, this.deploymentName);
  }

  requestDeployment(namespace: string, name: string) {
    this.deploymentService.getNamespacedDeploymentByName(namespace, name);
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
    this.deploymentName = s[3].path;
  }



}
