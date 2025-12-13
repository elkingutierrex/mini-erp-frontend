import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
  imports: [ RouterLink, CommonModule ]
})
export class ProductsList implements OnInit {
  products: any[] = [];
  constructor(private ps: ProductService) {}
  ngOnInit() {
    this.ps.getAll().subscribe(p => this.products = p);
  }
}
