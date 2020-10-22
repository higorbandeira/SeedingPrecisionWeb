import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { BusyService } from './Busy/busy.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private busy: BusyService) { }
  public listStatus: StatusAtual[]
  public statusSelected: StatusAtual

  async loadDataStatusAtual(){
    this.busy.show()
    try{
      this.listStatus = await this.http.get<StatusAtual[]>("https://localhost:5001/api/loadData").toPromise();
      return this.listStatus
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }

  async selectEquipament(index: number){
    if(index == null || index == undefined || index < 0){ index = 0 }
    this.statusSelected = this.listStatus[index];
  }

}

export class StatusAtual{
  id: string
  type: string
  humidAmbiente: HumidAmbiente
  humidSolo: HumidSolo
  luminosidade: Luminosidade
  tempAmbiente: TempAmbiente
  tempSolo: TempSolo
  pH: PH
}

export class Metadata
{
}

export class HumidAmbiente
{
  type: string
  value: number
  metadata: Metadata
}

export class HumidSolo
{
  type: string
  value: number
  metadata: Metadata
}

export class Luminosidade
{
  type: string
  value: number
  metadata: Metadata
}

export class TempAmbiente
{
  type: string
  value: number
  metadata: Metadata
}

export class TempSolo
{
  type: string
  value: number
  metadata: Metadata
}

export class PH
{
  type: string
  value: number
  metadata: Metadata
}
