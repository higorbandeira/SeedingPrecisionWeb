import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataServiceService, StatusAtual } from '../data-service.service';

@Component({
  selector: 'app-status-atual',
  templateUrl: './status-atual.component.html',
  styleUrls: ['./status-atual.component.css']
})
export class StatusAtualComponent implements OnInit  {
  // LINE CHART
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Humidade' },
    { data: [55, 49, 70, 51, 26, 15, 80], label: 'Temperatura' },
  ];
  public lineChartLabels: Label[] = ['12/10/2020', '13/10/2020', '14/10/2020', '15/10/2020', '16/10/2020', '17/10/2020', '18/10/2020'];
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

  // LINE CHART DAS DATAS DE COLETA
  public lineChartDataTwo: ChartDataSets[] = [
    { data: [1, 1, 1, 1, 1, 1, 1], label: 'Medições' },
  ];
  public lineChartLabelsTwo: Label[] = ['12/10/2020', '13/10/2020', '14/10/2020', '15/10/2020', '16/10/2020', '17/10/2020', '18/10/2020'];
  constructor(public service: DataServiceService) {  }

  async ngOnInit(): Promise<void> {
    //await this.service.selectEquipament(undefined);
    this.service.periodDisabled = true;
    this.service.getExternalAPI();
    this.service.AjustaPrevisãoDoTempo();
    

  }

  getpHColor(pH: number){
    //var pH = 7;
    if(pH <= 3) { return "#E02629"; }
    if(pH > 3 && pH <= 4) { return "#E76A30" }
    if(pH > 4 && pH <= 5) { return "#F0963E" }
    if(pH > 5 && pH <= 6) { return "#F5C533" }
    if(pH > 6 && pH <= 7) { return "#A2C63E" }
    if(pH > 7 && pH <= 8) { return "#196B67" }
    if(pH > 8 && pH <= 9) { return "#385E9D" }
    if(pH > 9) {return "#4D286E"}
  }
}
