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

  createSale(items: { productId: string|number; quantity: number; price: number, name:string }[], total:number ): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, {
      items,
      total
    });
  }

  getMySales(): Observable<Sale[]> {
    if (environment.useMock) {
      const me = this.auth.getCurrentUser()!.id;
      return this.db.getSales().pipe(
        map(sales => sales.filter(s => s.sellerId === me))
      );
    }

    return this.http.get<Sale[]>(`${this.apiUrl}/my-sales`);
  }


  getAllSales(): Observable<Sale[]> {
    return environment.useMock
      ? this.db.getSales()
      : this.http.get<Sale[]>(this.apiUrl);
  }
}
