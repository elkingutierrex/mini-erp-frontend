import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map, finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

private readonly productUrl = `${environment.productUrl}/products`;

  products  = signal<Product[]>([]);
  loading   = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getProducts() {
    this.loading.set(true);
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
  }
}
