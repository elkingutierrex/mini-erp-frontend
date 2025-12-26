import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartStore } from '../../../core/store/cart.store';
import { CusService } from '../../../core/services/cus.service';
import { SalesService } from '../../../core/services/sales.service';

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
    private cusService: CusService,
    private salesService: SalesService
  ) {}



  remove(productId: number) {
    this.cartStore.removeFromCart(productId);
  }

  checkout() {
  const cus = this.cusService.generate();
  const total = this.cartStore.total()

   const payload = {
    items: this.cartStore.cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    })),
    total,
  };
  this.salesService.createSale(payload.items, payload.total).subscribe({
    next: ()=>{
      this.cartStore.clearCart();

      this.router.navigate(['/checkout-success'], {
        state: {
          cus,
          total,
        },
      });
    }
  })
}
}
