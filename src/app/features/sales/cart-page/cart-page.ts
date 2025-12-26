import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartStore } from '../../../core/store/cart.store';
import { CusService } from '../../../core/services/cus.service';

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
    private router: Router,
    private cusService: CusService
  ) {}



  remove(productId: number) {
    this.cartStore.removeFromCart(productId);
  }

  checkout() {
  const cus = this.cusService.generate();
  const total = this.cartStore.total();
  console.log('Cus' + cus + 'total' + total );


  this.cartStore.clearCart();

  this.router.navigate(['/checkout-success'], {
    state: {
      cus,
      total,
    },
  });
}
}
