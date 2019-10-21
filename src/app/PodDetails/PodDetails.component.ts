import { Component, OnInit, Input } from '@angular/core';
import { V1Pod } from '@kubernetes/client-node/dist/gen/model/v1Pod';

@Component({
  selector: 'app-pod-details',
  templateUrl: './podDetails.component.html',
  styleUrls: ['./podDetails.component.css'],
})
export class PodDetailsComponent implements OnInit {

  @Input() pod: V1Pod;

  constructor() { }

  ngOnInit() {

  }

}
