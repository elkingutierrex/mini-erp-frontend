import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { MockDbService } from './mock-db.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private db: MockDbService) {}

  getAll(): Observable<Product[]> { return this.db.getProducts(); }
  getById(id: string) { return this.db.getProducts().pipe(); }
}
