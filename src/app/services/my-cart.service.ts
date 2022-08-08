import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../models/constanst';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
   @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
   }

  getMyCart(id:string, data: any):Observable<any> {
    let apiUrl= `${this.endpoint}/api/Order/Show/${id}`;
    return this.http.get(apiUrl,data);
  }


}
