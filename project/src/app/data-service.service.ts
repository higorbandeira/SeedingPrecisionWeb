import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, Router } from '@angular/router';
import { BusyService } from './Busy/busy.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private busy: BusyService) { }
  public listStatus: StatusAtual[]
  public statusSelected: StatusAtual
  public selectStatusHistory: StatusHistory;
  public startDate:Date;
  public endDate:Date;
  public periodDisabled: boolean = true;

  //URL: string = "http://seedingprecisionapi.azurewebsites.net";
  URL: string = "https://localhost:5001/";

  async loadDataStatusAtual(){
    this.busy.show()
    try{
      this.listStatus = await this.http.get<StatusAtual[]>(this.URL + "api/loadData").toPromise();
      return this.listStatus
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }
  
  async loadDataStatuHistory(id: string){
    this.busy.show()
    try{
      this.endDate = this.endDate==undefined?null:this.endDate ;
      this.startDate = this.startDate==undefined?null:this.startDate ;
      this.selectStatusHistory = await this.http.post<StatusHistory>(this.URL +"api/listStatusHistory?NumberOfTable", {NumberOfTable:id , StartDate:this.startDate, EndDate:this.endDate}).toPromise();      
      debugger;
      return this.selectStatusHistory
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }



  async selectEquipament(id: string){
    if(id == null || id == undefined || id == ""){ id = this.listStatus[0].id }
    this.statusSelected = this.listStatus.filter(x => x.id == id).reduce((p, c) => c);
  }
  async selectStartDate(startDate: Date){
    if(startDate!=null||startDate != undefined){
      this.startDate=startDate;      
    }
  }
  async selectEndDate(endDate: Date){
    if(endDate!=null||endDate != undefined){
      this.endDate=endDate;
    }
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
  data: string;
}
export class StatusHistory{

  humidAmbiente: number[]
  humidSolo: number[]
  luminosidade: number[]
  tempAmbiente: number[]
  tempSolo: number[]
  pH: number[]
  data: string[];
  dataCont: Date[];
  
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
