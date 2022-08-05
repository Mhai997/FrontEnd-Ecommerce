import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProductModule { }
