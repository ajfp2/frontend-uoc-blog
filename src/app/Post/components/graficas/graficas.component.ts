import { Component, Input } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import {  Chart, ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent {

  @Input() title: string = 'Sin titulo';

  @Input('chartType') chartType: ChartType = 'pie';
  @Input('chartOptions') options: ChartOptions = {
    responsive: true,
  };

  @Input('charData') data: ChartData = {
    labels: [],
    datasets: [
      {
        label: '',
        data: []
      }
    ]
  };
}
