import { Component, OnInit, Input } from '@angular/core';
import { V1Pod } from '../../../server/node_modules/@kubernetes/client-node/dist/gen/model/V1Pod';

@Component({
  selector: 'app-pod-details',
  templateUrl: './PodDetails.component.html',
  styleUrls: ['./PodDetails.component.css'],
})
export class PodDetailsComponent implements OnInit {

  @Input() pod: V1Pod;

  constructor() { }

  ngOnInit() {

  }

}
