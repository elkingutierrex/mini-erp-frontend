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
  totalProducts  = signal<number>(0);
  loading   = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getProducts(page = 1, limit = 12) {
      const skip = (page - 1) * limit;

    this.loading.set(true);
    this.http.get<any>(`${this.productUrl}?limit=${limit}&skip=${skip}`)
          .pipe(
            map(response => ({
          products: response.products.map( (p:any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            thumbnail: p.thumbnail,
          })),
          total: response.total,
        })),
        finalize(() => this.loading.set(false))
      )
        .subscribe({
          next: ({ products, total }) => {
            this.products.set(products);
            this.totalProducts.set(total);
          }, error: () => {
          this.products.set([]);
          this.totalProducts.set(0);
        }
        });
  }
}
