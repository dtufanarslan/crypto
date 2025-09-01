import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/example`);
  }
}
