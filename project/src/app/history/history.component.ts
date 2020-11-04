import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit  {
  constructor(public service: DataServiceService) {  }

  async ngOnInit(): Promise<void> {
    this.service.periodDisabled = false;
    await this.service.loadDataStatuHistory(this.service.statusSelected.id);
    console.log(this.service.selectStatusHistory);
  }

  // LINE CHART
  public lineChartOptions: (ChartOptions) = {
    responsive: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // TEMPERATURA E UMIDADE
  public lineChartData: ChartDataSets[] = [
    { data: this.service.selectStatusHistor, label: 'Humidade' },
    { data: this.service.selectStatusHistory.map(x => x.tempSolo.value), label: 'Temperatura' },
  ];
  public lineChartLabels: Label[] = ['12/10/2020', '13/10/2020', '14/10/2020', '15/10/2020', '16/10/2020', '17/10/2020', '18/10/2020'];
}