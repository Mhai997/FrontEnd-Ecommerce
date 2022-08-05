import { Component, OnInit } from '@angular/core';
import { GlobalParams } from 'src/app/models/globalParams';
import { ProductTypeService } from '../services/product-type.service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss']
})
export class ProductTypeListComponent implements OnInit {
  productTypes!:any;
  constructor(private productTypeService:ProductTypeService) { }

  ngOnInit(): void {
    this.productTypeService.getProductType(new GlobalParams()).subscribe(
      data=>this.productTypes = data
    );
  }

}
