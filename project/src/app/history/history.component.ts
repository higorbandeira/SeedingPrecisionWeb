import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataServiceService, StatusHistory } from '../data-service.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit  {
  constructor(public service: DataServiceService) {  }


  
  async ngOnInit(): Promise<void> {
    this.service.periodDisabled = false;
    debugger;
    this.OnChanges();    
  }

  

 
  // LINE CHART
  public lineChartOptionsTemperatura: (ChartOptions) = {
    responsive: false,
  };
  public lineChartDataTemperatura: ChartDataSets[] =[];
  public lineChartLabelsTemperatura: Label[] = [];
  public lineChartColorsTemperatura: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegendTemperatura = true;
  public lineChartTypeTemperatura = 'line';
  public lineChartPluginsTemperatura = []

  public lineChartOptionsUmidade: (ChartOptions) = {
    responsive: false,
  };
  public lineChartDataUmidade: ChartDataSets[] =[];
  public lineChartLabelsUmidade: Label[] = [];
  public lineChartColorsUmidade: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegendUmidade = true;
  public lineChartTypeUmidade = 'line';
  public lineChartPluginsUmidade = []

  public lineChartOptionsPH: (ChartOptions) = {
    responsive: false,
  };
  public lineChartDataPH: ChartDataSets[] =[];
  public lineChartLabelsPH: Label[] = [];
  public lineChartColorsPH: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
      pointBorderColor: 'green'
      
    },
  ];
  public lineChartLegendPH = true;
  public lineChartTypePH = 'line';
  public lineChartPluginsPH = []

public lineChartOptionsLuminosidade: (ChartOptions) = {
    responsive: false,
  };
  public lineChartDataLuminosidade: ChartDataSets[] =[];
  public lineChartLabelsLuminosidade: Label[] = [];
  public lineChartColorsLuminosidade: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
      pointBorderColor: 'yellow'
    },
  ];
  public lineChartLegendLuminosidade = true;
  public lineChartTypeLuminosidade = 'line';
  public lineChartPluginsLuminosidade = []



  async OnChanges() {
    await this.service.loadDataStatuHistory(this.service.statusSelected.id);
    this.lineChartDataTemperatura= [ 
      
      { data: this.service.selectStatusHistory.tempAmbiente, label: 'Temperatura Ambiente' },  
      { data: this.service.selectStatusHistory.tempSolo, label: 'Temperatura do Solo' },   
    ]
    this.lineChartDataUmidade= [ 
      { data: this.service.selectStatusHistory.humidAmbiente, label: 'Umidade Ambiente' },
      { data: this.service.selectStatusHistory.humidSolo, label: 'Umidade do Solo' },         
    ]
    this.lineChartDataPH= [        
      { data: this.service.selectStatusHistory.pH, label: 'PH' },   
    ]
    this.lineChartDataLuminosidade= [        
      { data: this.service.selectStatusHistory.luminosidade, label: 'PH' },   
    ]
    this.service.selectStatusHistory.data.pop()
    this.lineChartLabelsTemperatura = this.service.selectStatusHistory.data;
    this.lineChartLabelsUmidade = this.service.selectStatusHistory.data;
    this.lineChartLabelsPH = this.service.selectStatusHistory.data;
    this.lineChartLabelsLuminosidade = this.service.selectStatusHistory.data;


  }
  
}