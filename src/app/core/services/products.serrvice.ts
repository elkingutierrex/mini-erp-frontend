import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiUrl = 'https://dummyjson.com/products';

  // Signals (estado)
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>   {
    this.loading.set(true);

    this.http.get<any>(this.apiUrl)
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
        map(response => response.products)
      );
  }
}
