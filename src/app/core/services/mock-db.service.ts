import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  private users$ = new BehaviorSubject<User[]>(this.initialUsers());
  private products$ = new BehaviorSubject<Product[]>(this.initialProducts());
  private sales$ = new BehaviorSubject<Sale[]>(this.initialSales());

  // Observables
  getUsers(): Observable<User[]> { return this.users$.asObservable(); }
  getProducts(): Observable<Product[]> { return this.products$.asObservable(); }
  getSales(): Observable<Sale[]> { return this.sales$.asObservable(); }

  // CRUD minimal
  addSale(sale: Omit<Sale,'id'|'createdAt'>) {
    const newSale: Sale = {
      ...sale,
      id: uuid(),
      createdAt: new Date().toISOString()
    };
    const next = [...this.sales$.value, newSale];
    this.sales$.next(next);
    return of(newSale);
  }

  // roles crud for manager (simple)
  updateUser(updated: User) {
    const next = this.users$.value.map(u => u.id === updated.id ? {...u, ...updated} : u);
    this.users$.next(next);
    return of(true);
  }

  // seeds
  private initialUsers(): User[] {
    return [
      // { id: 'u1', email: 'seller1@erp.test',  password: '123', name: 'Juan Vendedor', role: 'seller', permissions: ['CanCreateSale'] , accessToken: '', expiresIn: 3600},
      // { id: 'u1', email: 'seller2@erp.test',  password: '123', name: 'Juan Vendedor', role: 'seller', permissions: ['CanCreateSale'] , accessToken: '', expiresIn: 3600},
      // { id: 'u2', email: 'admin@erp.test',    password: '123', name: 'Ana Admin', role: 'admin', permissions: ['CanViewAllSales'] , accessToken: '', expiresIn: 3600},
      // { id: 'u3', email: 'manager@erp.test',  password: '123', name: 'Gina Gerente', role: 'manager', permissions: ['CanCreateSale','CanViewAllSales','CanManageRoles'] , accessToken: '', expiresIn: 3600}
    ];
  }

  private initialProducts(): Product[] | any  {
    return [
      { id: 'p1', name: 'Computer', price: 10 },
      { id: 'p2', name: 'Mouse', price: 15 },
      { id: 'p3', name: 'Keyboard', price: 23 },
      { id: 'p4', name: 'Monitor', price: 7 },
      { id: 'p5', name: 'Headset', price: 50 }
    ];
  }

  private initialSales(): Sale[] {
    return [
      {
        id: 's1',
        sellerId: 'u1',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        items: [{ productId: 'p1', quantity: 2, price: 10 }],
        total: 20
      }
    ];
  }
}
