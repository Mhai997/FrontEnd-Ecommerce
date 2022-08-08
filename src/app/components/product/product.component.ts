import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearProductDto } from 'src/app/models/crearProductDto';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { ProductService } from 'src/app/services/product.service';
import { ProductDto } from 'src/app/models/productDto';
import { HttpClient } from '@angular/common/http';
import { orderDto } from 'src/app/models/orderDto';
import { OrderProductDto } from 'src/app/models/OrderProductDto';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:Array<ProductDto> = [];
  selectedProduct!:ProductDto;
  formulario!: FormGroup;

  product : CrearProductDto;
  submitted = false;
  GlobalService: any;

  stock: number [] = [];
  addProduct : OrderProductDto = {
    productId: "",
    productQuantity: 1

  };


  constructor(private http: HttpClient,private productService: ProductService,
    private modalService: NgbModal,


    private formBuilder: FormBuilder) {
      //this.product1 = {name:'', imageUrl:'', description: '',price:0,stock:0,productTypeId:'',brandId:''};
      this.product = {name:'', imageUrl:'', description: '',price:0,stock:0,productTypeId:'',brandId:'',productId:'',productQuantity:0};

     }

  ngOnInit(): void {
    this.productService.getProducts(new GlobalParams()).subscribe(
      data => this.products = data
    );
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description:['', Validators.required],
      price:['', Validators.required],
      stock:['', Validators.required],
      productTypeId:['', Validators.required],
      brandId: ['', Validators.required]
    });

  }
  get f() {
    return this.formulario.controls;
  }

  editProduct(code:string, content:any) {
    this.productService.getProductById(code).subscribe(
      response => {
        this.selectedProduct = response;
        console.log(this.selectedProduct);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    );
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(()=>{
      console.log('borrado');
      window.location.reload();
    })
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      id: [{value: this.selectedProduct.id, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      name: [this.selectedProduct.name, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      imageUrl: [this.selectedProduct.imageUrl, [Validators.required]],
      description: [this.selectedProduct.description,[Validators.required]],
      price: [this.selectedProduct.price,[Validators.required]],
      stock:[this.selectedProduct.stock,[Validators.required]],
      productTypeId: [this.selectedProduct.productTypeId,[Validators.required]],
      brandId: [this.selectedProduct.brandId,[Validators.required]]
    });
  }

  postProduct(){
    console.log(this.product);
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }

   this.productService.createProduct(this.product).subscribe((data)=>{
    console.log(data);
    window.location.reload();

   },error=>{
      console.log(error);
  });
  }
  get imageUrlField() {
    return this.formulario.get('imageUrl');
  }
  refrescar(): void {
    window.location.reload();
  }

  updateProduct(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.productService.updateProduct(this.formulario.getRawValue()).subscribe(
      response => console.log(response)
    );
  }


  addProductCart(productSelectedId : string, quantity : string ='1' ){
    this.addProduct.productId = productSelectedId;
    this.addProduct.productQuantity = parseInt(quantity);
    let orderId = localStorage.getItem('orderId');
    debugger;
    if(orderId == null){
      this.productService.createProduct1().subscribe((response:any)=>{
        console.log('si entro a la peticion');
        debugger;
        let responseOrder = response as Order;
        let orderNew = responseOrder.id;
        localStorage.setItem('orderId', orderNew);
        console.log(this.addProduct);

        this.productService.createProduct2(orderNew,this.addProduct).subscribe((response: any)=>{
           console.log('si')

        });
     });

    }
    //this.location.back();
  }

  }


