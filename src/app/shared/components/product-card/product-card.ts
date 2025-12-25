import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  price?: number;
}
=======
import { Product } from '../../../core/models/product.model';
>>>>>>> recovery-fix

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input({ required: true }) product!: Product;

  @Input() showAddButton = true;

  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
