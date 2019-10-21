import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { V1Pod } from '@kubernetes/client-node/dist/gen/model/V1Pod';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { PodService } from '../services/pod.service';
import { NavService } from '../services/nav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pod-list',
  templateUrl: './podList.component.html',
  styleUrls: ['./podList.component.css']
})
export class PodListComponent implements OnInit, OnChanges, OnDestroy {

  selectedNamespace;
  pods: V1Pod[];
  selectedPod: V1Pod;
  podsSubscription$: Subscription;
  selectedNamespace$: Subscription;

  constructor(
    private router: Router,
    private podService: PodService,
    private cdr: ChangeDetectorRef,
    // tslint:disable-next-line: variable-name
    private readonly _navService: NavService
    ) {
      this.selectedNamespace$ = this._navService.selectedNamespace$.subscribe((value) => {
        this.selectedNamespace = value;
      });
      console.log(this.selectedNamespace);
    }

  ngOnInit(): void  {
    console.log(this.selectedNamespace);

    this.podsSubscription$ = this.podService.pods.subscribe((value) => {
      console.log('pod list recived');
      this.pods = value;
      this.cdr.detectChanges();
    });
    this.requestPods(this.selectedNamespace);
  }

  requestPods(namespace: string) {
    this.podService.getGetNamespacedPods(namespace);
  }

  ngOnDestroy(): void {
    this.cdr.detach();
    this.selectedNamespace$.unsubscribe();
    this.podsSubscription$.unsubscribe();
  }

  ngOnChanges(): void {

  }

  onSelect(pod: V1Pod): void {
    // this.router.navigate(['/pod', pod.metadata.uid]);
    this.selectedPod = pod;
  }

  setNamespace() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.selectedNamespace = s[0].path;
  }
}
