import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

constructor(private http: HttpClient) {
}

 get(): Observable<any> {
  return this.http.get('http://localhost:3000/').pipe(
    retry(10), // retry a failed request up to 3 times
  );
  }
 }
