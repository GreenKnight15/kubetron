import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AppsV1beta1Deployment } from '@kubernetes/client-node/dist/gen/model/AppsV1beta1Deployment';
import { UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET, Router, NavigationEnd } from '@angular/router';
import { DeploymentService } from '../services/deployment.service';
import { NavService } from '../services/nav.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deploymentList.component.html',
  styleUrls: ['./deploymentList.component.css']
})
export class DeploymentListComponent implements OnInit, OnChanges, OnDestroy {

  selectedNamespace;
  deployments: AppsV1beta1Deployment[] = [];
  selectedDeployment: AppsV1beta1Deployment = {};
  deploymentSubscription$: Subscription;
  selectedNamespace$: Subscription;

  constructor(
    private router: Router,
    private deploymentService: DeploymentService,
    private cdr: ChangeDetectorRef,
    // tslint:disable-next-line: variable-name
    private readonly _navService: NavService
    ) {

    }

    ngOnInit(): void  {
      this.selectedNamespace$ = this._navService.selectedNamespace$.subscribe((value) => {
        this.selectedNamespace = value;
      });

      console.log(this.selectedNamespace);
      this.requestDeployments(this.selectedNamespace);
      this.deploymentSubscription$ = this.deploymentService.deployments.subscribe((value: AppsV1beta1Deployment[])  => {
        this.deployments = value;
        this.cdr.detectChanges();
      });
    }

  ngOnChanges(): void {
    // this.setNamespace();
  }

  requestDeployments(namespace: string) {
    this.deploymentService.getNamespacedDeployments(namespace);
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    this.deploymentSubscription$.unsubscribe();
    this.selectedNamespace$.unsubscribe();
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path;
  }
}
