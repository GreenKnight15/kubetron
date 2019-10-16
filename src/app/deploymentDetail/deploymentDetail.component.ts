import { Component, OnInit, Input } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { AppsV1beta1Deployment  } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/AppsV1beta1Deployment';
import { ActivatedRoute, NavigationStart, Router, PRIMARY_OUTLET, UrlTree, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void  {
    this.setNamespace();
    this.setDeployment(this.selectedNamespace, this.deploymentName);
  }

  ngOnChanges(): void {
    this.setDeployment(this.selectedNamespace, this.deploymentName);
  }

  setDeployment(namespace: string, name: string) {
    this.getDeployment(namespace, name).subscribe((res: AppsV1beta1Deployment) => {
      console.log(res);
      this.deployment = res;
    });
  }

  getDeployment(namespace: string, name: string) {
    return this.http.get('http://localhost:3000/' + namespace + '/deployment/' + name ).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  getDeploymentStatus(namespace: string, name: string) {
    return this.http.get('http://localhost:3000/' + namespace + '/deployment/status/' + name ).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path; // returns 'team'
    this.deploymentName = s[3].path;
    // s[0].parameters; // returns {id: 33}
  }



}
