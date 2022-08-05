import { NgModule } from "@angular/core";
import { ProductTypeComponent } from './product-type.component';
import { ProductTypeFormComponent } from './product-type-form/product-type-form.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations:[
    ProductTypeComponent,
    ProductTypeFormComponent,
    ProductTypeListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    ProductTypeComponent,
    ProductTypeFormComponent,
    ProductTypeListComponent
  ]
})
export class ProductTypeModule{

}
