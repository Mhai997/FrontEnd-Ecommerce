import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../models/constanst';
import { GlobalParams } from '../models/globalParams';
import { CrearProductDto } from '../models/crearProductDto';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
   @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
   }

  getProducts(globalParams: GlobalParams):Observable<any> {
    let apiUrl= `${this.endpoint}/api/Product`;
    let params = new HttpParams();
    if(globalParams.search){
      params=params.append('search', globalParams.search);
    }
    if(globalParams.sort){
      params=params.append('sort', globalParams.sort);
    }
    if(globalParams.sortOrder){
      params=params.append('order', globalParams.sortOrder);
    }
    if(globalParams.pageSize){
      params=params.append('limit', globalParams.pageSize);
    }
    if(globalParams.pageNumber){
      params=params.append('offset', globalParams.pageNumber);
    }
    return this.http.get(apiUrl,{params: params});
  }

  getProductById(code:string):Observable<any> {
    let apiUrl= `${this.endpoint}/api/Product/${code}`;
    console.log(apiUrl);

    return this.http.get(apiUrl);
  }

  createProduct(data: CrearProductDto){
    let apiUrl= `${this.endpoint}/api/Product`;

    return this.http.post(apiUrl, data);
  }

  createProduct1(data?: any){
    let apiUrl= `${this.endpoint}/api/Order`;

    return this.http.post(apiUrl, data);
  }
  createProduct2(orderNew:string,data: any){
    let apiUrl= `${this.endpoint}/api/Order/${orderNew}/Product`;

    return this.http.post(apiUrl, data);
  }

  deleteProduct(id:string): Observable<any>{
    let apiUrl= `${this.endpoint}/api/Product/${id}`;
    return this.http.delete(apiUrl);

  }
  getMyCart(orderNew:string, data: any):Observable<any> {
    let apiUrl= `${this.endpoint}/api/Order/Show/${orderNew}`;
    return this.http.get(apiUrl,data);
  }

  updateProduct(data: any):Observable<any>{
    let apiUrl= `${this.endpoint}/api/Product`;
    return this.http.put(apiUrl, data).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else  {
      errorMessage = `Codigo error: ${error.status} mensaje: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(() =>{
      return errorMessage;
    });
  }
}
