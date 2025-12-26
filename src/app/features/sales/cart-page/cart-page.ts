import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartStore } from '../../../core/store/cart.store';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {

  constructor(
    public cartStore: CartStore,
    private router: Router
  ) {}



  remove(productId: number) {
    this.cartStore.removeFromCart(productId);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
