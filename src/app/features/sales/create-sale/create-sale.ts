import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { SalesService } from '../../../core/services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-sale',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-sale.html',
  styleUrls: ['./create-sale.scss']
  })
export class CreateSale implements OnInit {
  products: any[] = [];
  quantities: Record<string, number> = {};
  msg = '';

  constructor(private ps: ProductService, private ss: SalesService, private router: Router) {}
  ngOnInit(){ this.ps.getAll().subscribe(p => { this.products = p; p.forEach(x => this.quantities[x.id]=0); }); }

  submit(){
    const items = this.products
      .filter(p => this.quantities[p.id] > 0)
      .map(p => ({ productId: p.id, quantity: this.quantities[p.id], price: p.price }));
    if(items.length === 0) return;
    this.ss.createSale(items).subscribe(() => {
      this.msg = 'Venta creada';
      setTimeout(()=> this.router.navigate(['/ventas/mis-ventas']), 800);
    });
  }
}
