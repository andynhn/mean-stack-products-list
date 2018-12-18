import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  product = {
    "name": '',
    "price": Number,
    "image": ''
  }
  products = [];
  errors = {};
  constructor(
    private _productService: ProductService, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  createProduct(){
    let observable = this._productService.createProduct(this.product);
    observable.subscribe(data => {
      console.log("createProduct - Data from Product Service", data);
      if(data['status'] == "not ok"){
        this.errors = data['errors']['errors'];
      } else {
        this.getProducts();
        this._router.navigate(['/products']);
      }
    });
  }
  getProducts(){
    let observable = this._productService.getProducts();
    observable.subscribe(data => {
      console.log("getProducts - Data from Product Service", data);
      this.products = data['products'];
    })
  }

}
