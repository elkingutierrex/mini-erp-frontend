import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';


@Component({
  standalone: true,
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
  imports: [ RouterLink, CommonModule, ProductCard ]
})
export class ProductsList implements OnInit {
  products: any[] = [];
  constructor(private ps: ProductService) {}
  ngOnInit() {
    this.ps.getAll().subscribe(result => {this.products = result;
      console.log('Estos son los productos', result)
    });

  }
}
