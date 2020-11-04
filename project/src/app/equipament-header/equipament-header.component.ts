import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataServiceService, StatusAtual } from '../data-service.service';

@Component({
  selector: 'app-equipament-header',
  templateUrl: './equipament-header.component.html',
  styleUrls: ['./equipament-header.component.css']
})
export class EquipamentHeaderComponent implements OnInit {
  selectedValue: StatusAtual;

  constructor(public service: DataServiceService, private fb: FormBuilder) { }
  public searchForm: FormGroup;
  private id: string;
  
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
    this.searchForm.valueChanges.subscribe(async value => {
      this.id = value.selectedValue;
      await this.OnDataInit();
    });
  }

 private async OnDataInit() {
    await this.service.selectEquipament(this.id);
 }
}
