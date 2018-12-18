import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products = [];

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    let observable = this._productService.getProducts();
    observable.subscribe(data => {
      console.log("getProducts - Data from Product Service", data);
      this.products = data['products'];
    })
  }
  deleteProduct(id){
    let observable = this._productService.deleteProduct(id);
    observable.subscribe( data => {
      console.log("Deleted Product")
      this.getProducts();
    })
  }

}
