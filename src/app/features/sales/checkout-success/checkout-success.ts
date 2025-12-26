import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess {

  cus = history.state?.cus;
  total = history.state?.total;

  constructor(private router: Router) {
    // if (!this.cus) {
    //   this.router.navigate(['/products']);
    // }
  }

  goToProducts() {
    this.router.navigate(['/sales/products']);
  }
}
