import { Component, OnInit } from '@angular/core';

import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SalesService } from '../../../core/services/sales.service';

@Component({
  standalone: true,
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dash-board.html',
  styleUrls: ['./manager-dash-board.scss'],
  imports: [BaseChartDirective]
})
export class ManagerDashboard implements OnInit {
  chartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ data: [], label: 'Ventas' }]
  };
  chartOptions: ChartOptions = { responsive: true };

  constructor(private salesService: SalesService) {}

  ngOnInit(){
    this.salesService.getAllSales().subscribe(sales => {
      // agrupar por fecha corta
      const map = new Map<string, number>();
      sales.forEach(s => {
        const day = new Date(s.createdAt).toLocaleDateString();
        map.set(day, (map.get(day) || 0) + s.total);
      });
      this.chartData.datasets[0].data = Array.from(map.values());
      this.chartData.labels = Array.from(map.keys());
      // ng2-charts consumes `ChartData` object with `labels` + `datasets`
    });
  }
}
