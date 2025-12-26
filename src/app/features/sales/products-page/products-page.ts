import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products.serrvice';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { Loader } from '../../../shared/components/loader/loader';
import { Product } from '../../../core/models/product.model';
import { CartStore } from '../../../core/store/cart.store';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductCard, Loader],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit {

  constructor(
    public productsService: ProductsService,
    private cartStore: CartStore,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts();
  }

  onAddToCart(product: Product) {
    this.cartStore.addToCart(product);
    this.notification.success('Adicionado correctamente');
  }
}
