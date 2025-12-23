import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';


export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartStore {

  private readonly _cartItems = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this._cartItems.asObservable();

  get cartItems(): CartItem[] {
    return this._cartItems.getValue();
  }

  addToCart(product: Product) {
    const items = [...this.cartItems];
    const item = items.find(i => i.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }

    this._cartItems.next(items);
  }

  removeFromCart(productId: number) {
    const items = this.cartItems.filter(i => i.product.id !== productId);
    this._cartItems.next(items);
  }

  clearCart() {
    this._cartItems.next([]);
  }
}
