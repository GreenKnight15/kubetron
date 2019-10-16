import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { V1PodList } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/V1PodList';
import { V1Pod } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/V1Pod';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-pod-list',
  templateUrl: './PodList.component.html',
  styleUrls: ['./PodList.component.css']
})
export class PodListComponent implements OnInit, OnChanges {

  selectedNamespace;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.setNamespace();
  }

  pods: V1Pod[];
  selectedPod: V1Pod;

  ngOnInit(): void  {
    console.log(this.selectedNamespace);
    this.setPods(this.selectedNamespace);
  }

  ngOnChanges(): void {
    this.setPods(this.selectedNamespace);
  }

  setPods(namespace: string) {
    this.getPods(namespace).subscribe((res: V1PodList) => {
      this.pods = res.items;
    });
  }

  getPods(namespace: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('namespace', namespace);

    return this.http.get('http://localhost:3000/' + namespace + '/list/pod' ).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  onSelect(pod: V1Pod): void {
    // this.router.navigate(['/pod', pod.metadata.uid]);
    this.selectedPod = pod;
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path; // returns 'team'
    // s[0].parameters; // returns {id: 33}
  }
}
