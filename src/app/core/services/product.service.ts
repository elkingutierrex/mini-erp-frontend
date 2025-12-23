import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { MockDbService } from './mock-db.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private db: MockDbService
  ) {}

  getAll(): Observable<Product[]> {
    return environment.useMock
      ? this.db.getProducts()
      : this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: string): Observable<Product> {
    return environment.useMock
      ? this.db.getProducts()
          // simple mock lookup
          .pipe(map(products => products.find((p:any) => p.id === id)!))
      : this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
