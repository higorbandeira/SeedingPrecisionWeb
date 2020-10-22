import { Component, OnInit } from '@angular/core';
import { DataServiceService, StatusAtual } from 'src/app/data-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {  }

  onSelectEquipament(item: StatusAtual){
    this.service.selectEquipament(item.id);
  }

}
