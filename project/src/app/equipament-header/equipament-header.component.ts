import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from '../data-service.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-equipament-header',
  templateUrl: './equipament-header.component.html',
  styleUrls: ['./equipament-header.component.css']
})
export class EquipamentHeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public service: DataServiceService) { }

  ngOnInit(): void {  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }

}
