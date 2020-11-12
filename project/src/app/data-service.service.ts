import { HttpClient, HttpParams } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
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
  public groupDisabled: boolean = true;
  public test;sss
  public wheathers: Weather[];
  public Agrupamento: string;
  public periods:string[];
  
  URL: string = "http://seedingapi.azurewebsites.net/";
  //URL: string = "http://localhost:5000/";
  URLeX: string = "https://cors-anywhere.herokuapp.com/http://wttr.in/";

  async loadDataStatusAtual(){
    this.busy.show()
    try{
      this.listStatus = await this.http.get<StatusAtual[]>(this.URL + "api/loadData").toPromise();
      return this.listStatus
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }

  public resultClima: any;
  async getClima(){
    var requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(this.URL + "api/getClima", requestOptions)
      .then(response => response.text())
      .then(result => this.resultClima = result)
      .catch(error => console.log('error', error));
  }

   async getExternalAPI(){
    this.busy.show()  
    try{      
      this.test = await this.http.get(this.URLeX+"são+bernardo+do+campo?format=j1").toPromise();
      
      return this.test;    
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }

  async AjustaPrevisãoDoTempo()
  {
    this.periods=["Manhã","Meio-dia",  "Tarde", "Noite"];
    this.wheathers=[];
    this.wheathers.push({
      temp_C:this.test.current_condition[0].temp_C,
      visibility: this.test.current_condition[0].visibility,
      humidity: this.test.current_condition[0].humidity,
      pressure: this.test.current_condition[0].pressure,
      precipMM: this.test.current_condition[0].precipMM,
      localObsDateTime: this.test.current_condition[0].localObsDateTime,
      weatherDesc:this.test.current_condition[0].lang_pt,
      Period: null
    })
    let i=1;
    for(let j=0;j<3;j++)
    {
      let weather = this.test.weather[j];
      for(let k=0;k<4;k++)
      {
        let hourly =weather.hourly[k];
        this.wheathers.push(
        {
          
          temp_C:hourly.tempC,
          visibility: hourly.visibility,
          humidity: hourly.humidity,
          pressure: hourly.pressure,
          precipMM: hourly.precipMM,
          localObsDateTime: weather.date,
          weatherDesc:hourly.lang_pt,
          Period: this.periods[k]
        })               
      } 
    }    
  }

  
  async loadDataStatuHistory(id: string){
    this.busy.show()
    try{
      this.endDate = this.endDate==undefined?null:this.endDate ;
      this.startDate = this.startDate==undefined?null:this.startDate ;
      this.selectStatusHistory = await this.http.post<StatusHistory>(this.URL +"api/listStatusHistory?NumberOfTable", {NumberOfTable:id , StartDate:this.startDate, EndDate:this.endDate, Agrupamento:this.Agrupamento}).toPromise();      
      return this.selectStatusHistory
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }



  async selectEquipament(id: string){
    if(id == null || id == undefined || id == ""){ id = this.listStatus[0].id }
    this.statusSelected = this.listStatus.filter(x => x.id == id).reduce((p, c) => c);
  }
  async selectAgroupament(agroup: string){
    if(agroup == null || agroup == undefined || agroup == ""){ agroup = "Dia" }
    this.Agrupamento = agroup;
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

export class PrevisãoDoTempo{
  current_condition:[]
  nearest_area:[]
  request:[]
  weather:[]
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
  isEmpty: boolean;
  
}

export class current_condition{
  temp_C:string
  visibility: string;
  cloudcover: string;
  weather : string;
  pressure: string;
  precipMM: string;
  localObsDateTime: string;
  observation_time: string;
  weatherDesc:{}[];
}

export class Weather{
  constructor(
    public temp_C:string,
    public visibility: string,
    public humidity: string,
    public pressure: string,
    public precipMM: string,
    public localObsDateTime: string,
    public weatherDesc:{}[],
    public Period: string)
  {}
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
