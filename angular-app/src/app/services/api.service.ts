import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getQuizzes(query: any): Observable<any> {
    const httpParams = qs.stringify(query);
    return this.http.get<any>(`${environment.API_URL}/quizzes?${httpParams}`);
  }
}
