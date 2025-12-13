import { Component, OnInit } from '@angular/core';

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { SalesService } from '../../../core/services/sales.service';

@Component({
  standalone: true,
  selector: 'app-all-sales',
  templateUrl: './all-sales.html',
  styleUrls: ['./all-sales.scss'],
  providers: [CommonModule, DatePipe, CurrencyPipe]
})
export class AllSales implements OnInit {
  sales: any[] = [];
  constructor(private salesService: SalesService) {}
  ngOnInit(){ this.salesService.getAllSales().subscribe(s=>this.sales=s); }
}
