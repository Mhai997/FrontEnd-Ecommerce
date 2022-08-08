import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../models/constanst';
import { GlobalParams } from '../models/globalParams';
import { catchError, Observable, throwError } from 'rxjs';
import { orderDto } from 'src/app/models/orderDto';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
   @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
   }
   CreateOrder(data: any){
    this.http.post(`${this.endpoint}/api/Token`,data).subscribe(orderDto=>{
      let orderResponse = orderDto as orderDto;
      //localStorage['setToken'](tokenDtoResponse.token);

      localStorage.setItem('orderId',orderResponse.id);
    })
   }
}
