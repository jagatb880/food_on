import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { } 

  get(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${ConstantService.baseUrl + url}`, { headers, params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  post(url: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${ConstantService.baseUrl + url}`, body, { headers, params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }
}
