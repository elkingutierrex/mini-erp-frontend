import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartStore } from '../../../core/store/cart.store/cart.store';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, ProductCard],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
constructor(public cartStore: CartStore) {}

  get total(): number {
    return this.cartStore.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  remove(productId: number) {
    this.cartStore.removeFromCart(productId);
  }
}
