import { Component, OnInit, OnChanges } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { AppsV1beta1Deployment  } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/AppsV1beta1Deployment';
// tslint:disable-next-line: max-line-length
import { AppsV1beta1DeploymentList } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/AppsV1beta1DeploymentList';
import { HttpParams, HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET, Router } from '@angular/router';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deploymentList.component.html',
  styleUrls: ['./deploymentList.component.css']
})
export class DeploymentListComponent implements OnInit, OnChanges {

  selectedNamespace;
  deployments: AppsV1beta1Deployment[];
  selectedDeployment: AppsV1beta1Deployment;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void  {
    console.log(this.selectedNamespace);
    this.setNamespace();
    this.setDeployments(this.selectedNamespace);
  }

  ngOnChanges(): void {
    this.setNamespace();
    this.setDeployments(this.selectedNamespace);
  }

  setDeployments(namespace: string) {
    this.getDeployments(namespace).subscribe((res: AppsV1beta1DeploymentList) => {
      console.log(res.items);
      this.deployments = res.items;
    });
  }

  getDeployments(namespace: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('namespace', namespace);

    return this.http.get('http://localhost:3000/' + namespace + '/list/deployment' ).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path; // returns 'team'
    // s[0].parameters; // returns {id: 33}
  }
}
