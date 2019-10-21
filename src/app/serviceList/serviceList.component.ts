import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { V1Service } from '@kubernetes/client-node/dist/gen/model/V1Service';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './serviceList.component.html',
  styleUrls: ['./serviceList.component.css']
})
export class ServiceListComponent implements OnInit, OnChanges {

  selectedNamespace;
  services: V1Service[];
  selectedService: V1Service;
  servicesSubscription$;

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    // tslint:disable-next-line: variable-name
    private readonly _electronService: ElectronService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void  {
    console.log(this.selectedNamespace);
    this.setNamespace();

    this.servicesSubscription$ = this.serviceService.services.subscribe((value) => {
      this.services = value;
      this.cdr.detectChanges();
    });
    this.requestServices(this.selectedNamespace);
  }

  ngOnChanges(): void {
    this.setNamespace();
  }

  requestServices(namespace: string) {
    this.serviceService.getGetNamespacedService(namespace);
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path;
  }

}
