import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'mini-erp-cart';

@Injectable({
  providedIn: 'root',
})
export class CartStore {

  private readonly _cartItems$ = new BehaviorSubject<CartItem[]>(
    this.loadFromStorage()
  );

  readonly cartItems$ = this._cartItems$.asObservable();

  private readonly _cartItemsSignal = signal<CartItem[]>(
    this._cartItems$.getValue()
  );

  constructor() {
    this._cartItems$.subscribe(items => {
      this._cartItemsSignal.set(items);
    });
  }


  get cartItems(): CartItem[] {
    return this._cartItems$.getValue();
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }


  total = computed(() =>
    this._cartItemsSignal().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  addToCart(product: Product) {
    const items = [...this.cartItems];
    const item = items.find(i => i.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.updateState(items);
  }

  removeFromCart(productId: number) {
    const items = this.cartItems.filter(
      i => i.product.id !== productId
    );
    this.updateState(items);
  }

  clearCart() {
    this.updateState([]);
  }

  private updateState(items: CartItem[]) {
    this._cartItems$.next(items);
    this.saveToStorage(items);
  }

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
