import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
<<<<<<< HEAD
import { map, finalize } from 'rxjs';
=======
import { map, finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
>>>>>>> recovery-fix

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

<<<<<<< HEAD
  private readonly apiUrl = 'https://dummyjson.com/products';

  // Signals (estado)
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
=======
private readonly productUrl = `${environment.productUrl}/products`;

  products  = signal<Product[]>([]);
  loading   = signal<boolean>(false);
>>>>>>> recovery-fix

  constructor(private http: HttpClient) {}

  getProducts() {
    this.loading.set(true);
<<<<<<< HEAD

    this.http.get<any>(this.apiUrl)
      .pipe(
        map(response => response.products as Product[]),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: products => this.products.set(products),
        error: () => this.products.set([])
      });
=======
    this.http.get<any>(this.productUrl)
          .pipe(
            map( response =>
            response.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            thumbnail: p.thumbnail,
          }))
          ), finalize( ()=> this.loading.set(false))
        )
        .subscribe({
          next: (products) => this.products.set(products),
          error: () => this.products.set([])
        });
>>>>>>> recovery-fix
  }
}
