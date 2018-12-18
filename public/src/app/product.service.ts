import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { 
    
  }
  getProducts(){
    return this._http.get('/products');
  }
  getProduct(id){
    return this._http.get(`/products/${id}`);
  }
  createProduct(newProduct){
    return this._http.post('/products', newProduct);
  }
  updateProduct(id, selectedProduct){
    return this._http.put(`/products/${id}`, selectedProduct);
  }
  deleteProduct(id){
    return this._http.delete(`/products/${id}`);
  }
}
