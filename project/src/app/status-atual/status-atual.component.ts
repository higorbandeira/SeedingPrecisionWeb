import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-atual',
  templateUrl: './status-atual.component.html',
  styleUrls: ['./status-atual.component.css']
})
export class StatusAtualComponent implements OnInit, OnDestroy  {
  percentageValue: (value: number) => string;

  gaugeValues: any = {
    3: 50,
  };

  interval: any;

  constructor() {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)} / ${this['max']}`;
    };
  }

  ngOnInit(): void {
    const updateValues = (): void => {
      this.gaugeValues = {
        3: Math.round(Math.random() * 100),
      };
    };

    const INTERVAL: number = 5000;

    this.interval = setInterval(updateValues, INTERVAL);
    updateValues();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
