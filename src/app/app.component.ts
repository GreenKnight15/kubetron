import { Component, OnInit, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { V1Namespace } from '@kubernetes/client-node/dist/gen/model/V1Namespace';
import { V1NamespaceList } from '@kubernetes/client-node/dist/gen/model/V1NamespaceList';
import { NavService } from './services/nav.service';

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

  kinds = [
    {route: 'list/pod', kind: 'Pods'},
    {route: 'list/service', kind: 'Service'},
    {route: 'list/deployment', kind: 'Deployment'}
   ];

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private readonly _electronService: ElectronService,
    // tslint:disable-next-line: variable-name
    private _navService: NavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this._electronService.ipcRenderer.on('getNamespacesListResponse', (event, arg: V1NamespaceList) => {
      console.log('getNamespacesListResponse received');
      this.namespaces = arg.items;
      this.selectedNamespace = arg.items[0];
      this._navService.setNamespace(arg.items[0].metadata.name);
    });

    this._electronService.ipcRenderer.send('getNamespacesListRequest');
  }

  ngOnInit()  {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  goBack() {
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  onNamespaceSelect(namespace: string) {
    console.log(namespace);
    this._navService.setNamespace(namespace);
  }
}
