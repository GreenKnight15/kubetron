import { Component, OnInit, Input } from '@angular/core';
import { V1Pod } from '@kubernetes/client-node';

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
