import { Component, OnInit, Input, OnChanges, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { V1Pod } from '@kubernetes/client-node';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ElectronService } from '../services/electron.service';
import { PodService } from '../services/pod.service';

@Component({
  selector: 'app-pod-list',
  templateUrl: './PodList.component.html',
  styleUrls: ['./PodList.component.css']
})
export class PodListComponent implements OnInit, OnChanges, OnDestroy {

  selectedNamespace;
  pods: V1Pod[];
  selectedPod: V1Pod;
  podsSubscription$;

  constructor(
    private router: Router,
    private readonly _ipc: ElectronService,
    private podService: PodService,
    private cdr: ChangeDetectorRef)
    {
      this.setNamespace();
    }

  ngOnInit(): void  {
    console.log(this.selectedNamespace);

    this.podsSubscription$ = this.podService.pods.subscribe((value) => {
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
    this.selectedNamespace = s[0].path; // returns 'team'
    // s[0].parameters; // returns {id: 33}
  }
}
