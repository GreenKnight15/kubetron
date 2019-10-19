import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { V1Namespace, V1NamespaceList } from '@kubernetes/client-node';
import { ElectronService } from './services/electron.service';

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
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private http: HttpClient, private route: ActivatedRoute, private readonly _ipc: ElectronService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this._ipc.on('getNamespaces-res', (event, arg: V1NamespaceList) => {
      console.log('recived namespaces')
      this.namespaces = arg.items;
      this.selectedNamespace = arg.items[0];
    });
    this._ipc.send('getNamespaces-req');
  }

  ngOnInit()  {
    this.menuItem.push({path: 'pod', text: 'Pods', namespace: this.selectedNamespace.metadata.name});
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  goBack() {
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  onNamespaceSelect(namespace: V1Namespace) {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespaceName = s[0].path;
    // s[0].parameters;
    const redirectNamespace = this.router.url.replace(this.selectedNamespaceName, namespace.metadata.name);
    this.router.navigateByUrl(redirectNamespace);
  }
}
