import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product = {};
  errors = {};
  products = [];

  constructor(
    private _productService: ProductService, 
    private _router: Router, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getProduct(params['id']);
    })
  }
  getProduct(id){
    let observable = this._productService.getProduct(id);
    observable.subscribe(data => {
      this.product = data['product']
      console.log("getProduct - Data from Product Service", data);
    })
  }
  updateProduct(id){
    let observable = this._productService.updateProduct(id, this.product);
    observable.subscribe( data => {
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        console.log("updateProduct - Data from Product Service", data);
        this.getProducts();
        this._router.navigate(['/products']);
      }
    })
  }
  getProducts(){
    let observable = this._productService.getProducts();
    observable.subscribe(data => {
      console.log("getProducts - Data from Product Service", data);
      this.products = data['products'];
    })
  }

}
