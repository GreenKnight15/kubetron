import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.css']
})
export class NamespaceComponent implements OnInit {

  selectedNamespace = 'default';

  kinds = [
    {route: 'pod', kind: 'Pods'},
    {route: 'service', kind: 'Service'},
    {route: 'deployment', kind: 'Deployment'}
   ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelect(routePath: string): void {
    this.router.navigate([routePath], { relativeTo: this.route});
  }

}
