import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Sale } from '../models/sale.model';
import { AuthService } from './auth.service';
import { MockDbService } from './mock-db.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly apiUrl = `${environment.apiUrl}/sales`;

  constructor(
    private http: HttpClient,
    private db: MockDbService,
    private auth: AuthService
  ) {}

  // ============================
  // CREATE SALE
  // ============================
  createSale(
    items: { productId: string; quantity: number; price: number }[]
  ): Observable<Sale> {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    if (environment.useMock) {
      const sellerId = this.auth.getCurrentUser()!.id;
      return this.db.addSale({ sellerId, items, total } as any);
    }

    // 🔥 NO enviamos sellerId (backend lo toma del JWT)
    return this.http.post<Sale>(this.apiUrl, {
      items,
      total
    });
  }

  // ============================
  // GET MY SALES
  // ============================
  getMySales(): Observable<Sale[]> {
    if (environment.useMock) {
      const me = this.auth.getCurrentUser()!.id;
      return this.db.getSales().pipe(
        map(sales => sales.filter(s => s.sellerId === me))
      );
    }

    return this.http.get<Sale[]>(`${this.apiUrl}/my-sales`);
  }

  // ============================
  // GET ALL SALES (ADMIN)
  // ============================
  getAllSales(): Observable<Sale[]> {
    return environment.useMock
      ? this.db.getSales()
      : this.http.get<Sale[]>(this.apiUrl);
  }
}
