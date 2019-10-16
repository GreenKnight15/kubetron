import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { V1NamespaceList } from '../../server/node_modules/@kubernetes/client-node/dist/gen/model/v1NamespaceList';
import { V1Namespace } from '../../server/node_modules/@kubernetes/client-node/dist/gen/model/v1Namespace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'kubetron';
  mobileQuery: MediaQueryList;
  namespaces: V1Namespace[];
  selectedNamespace: V1Namespace;
  menuItem: any[] = [{path: 'home', text: 'Home'}];
  selectedNamespaceName: string;
  private mobileQueryListener: () => void;

  // tslint:disable-next-line: max-line-length
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit()  {
    this.getNamespaces().subscribe((res: V1NamespaceList) => {
      this.namespaces = res.items;
      console.log(this.namespaces);
      this.selectedNamespace = res.items[0];
      this.menuItem.push({path: 'pod', text: 'Pods', namespace: this.selectedNamespace.metadata.name});
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  getNamespaces() {
    return this.http.get('http://localhost:3000/namespace/list').pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  goBack() {
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  onNamespaceSelect(namespace: V1Namespace) {
    console.log(namespace);
    console.log(this.router.url);
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespaceName = s[0].path; // returns 'team'
    // s[0].parameters; // returns {id: 33}
    const redirectNamespace = this.router.url.replace(this.selectedNamespaceName, namespace.metadata.name);
    this.router.navigateByUrl(redirectNamespace);
  }
}
