import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService,  StatusAtual } from '../data-service.service';

@Component({
  selector: 'app-equipament-header',
  templateUrl: './equipament-header.component.html',
  styleUrls: ['./equipament-header.component.css']
})
export class EquipamentHeaderComponent implements OnInit {
  selectedValue: StatusAtual;


  constructor(public service: DataServiceService, private fb: FormBuilder, private router:Router) { }
  public searchForm: FormGroup;
  private id: string;
  private startDate:Date;
  private endDate:Date;
  
  
  async ngOnInit() {
    await this.service.loadDataStatusAtual();
    await this.OnDataInit();
    this.id = this.service.statusSelected.id;
    this.searchForm = this.fb.group({
      selectedValue: [this.service.statusSelected.id],
      start: new FormControl(),
      end: new FormControl()
    });
    this.OnChanges();
  }
  

  private async OnChanges() {
    debugger;
    this.searchForm.valueChanges.subscribe(async value => {
      this.id = value.selectedValue;
      this.startDate= value.start;
      this.endDate = value.end;
      await this.OnDataInit();     
    });
  }
  private async OnDataInit() {
    await this.service.selectEquipament(this.id);
    await this.service.selectStartDate(this.startDate);
    await this.service.selectEndDate(this.endDate);
  }
}
