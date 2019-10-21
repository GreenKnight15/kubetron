import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  selectedNamespace$ = new BehaviorSubject<string>('default');

constructor() { }

setNamespace(namespace: string) {
  this.selectedNamespace$.next(namespace);
  console.log('Namespace is now ' + this.selectedNamespace$);
}

}
