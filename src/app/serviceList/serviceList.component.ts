import { Component, OnInit, OnChanges } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { V1Service  } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/v1Service';
// tslint:disable-next-line: max-line-length
import { V1ServiceList } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/v1ServiceList';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './serviceList.component.html',
  styleUrls: ['./serviceList.component.css']
})
export class ServiceListComponent implements OnInit, OnChanges {

  selectedNamespace;
  services: V1Service[];
  selectedService: V1Service;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void  {
    console.log(this.selectedNamespace);
    this.setNamespace();
    this.setServices(this.selectedNamespace);
  }

  ngOnChanges(): void {
    this.setNamespace();
    this.setServices(this.selectedNamespace);
  }

  setServices(namespace: string) {
    this.getServices(namespace).subscribe((res: V1ServiceList) => {
      console.log(res.items);
      this.services = res.items;
    });
  }

  getServices(namespace: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('namespace', namespace);

    return this.http.get('http://localhost:3000/' + namespace + '/list/service' ).pipe(
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
