import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SalesService } from '../../../core/services/sales.service';

@Component({
  standalone: true,
  selector: 'app-my-sales',
  templateUrl: './my-sales.html',
  styleUrls: ['./my-sales.scss'],
  imports: [CommonModule]
})
export class MySales implements OnInit {
  sales: any[] = [];
  constructor(private salesService: SalesService) {}
  ngOnInit(){ this.salesService.getMySales().subscribe((s: any[])=>this.sales=s); }
}
