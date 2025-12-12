import { Injectable } from '@angular/core';
import { Sale } from '../models/sale.model';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { MockDbService } from './mock-db.service';

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(private db: MockDbService, private auth: AuthService) {}

  createSale(items: { productId: string; quantity: number; price: number }[]): Observable<Sale> {
    const sellerId = this.auth.getCurrentUser()!.id;
    const total = items.reduce((s, it) => s + it.quantity * it.price, 0);
    return this.db.addSale({ sellerId, items, total } as any);
  }

  getMySales(): Observable<Sale[]> {
    const me = this.auth.getCurrentUser()!;
    return this.db.getSales().pipe(map(sales => sales.filter(s => s.sellerId === me.id)));
  }

  getAllSales(): Observable<Sale[]> {
    return this.db.getSales();
  }
}
