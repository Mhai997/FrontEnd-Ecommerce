import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/models/constanst';
import { GlobalParams } from 'src/app/models/globalParams';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,
    @Inject(BASE_URL) endpoint:string) {
     this.endpoint = endpoint;
    }

    getProductType(globalParams: GlobalParams):Observable<any> {
      let apiUrl= `${this.endpoint}/api/ProductType`;
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


}
