import { Component, OnInit } from '@angular/core';
import { BusyService } from './busy.service';

@Component({
   selector: 'ors-busy',
   template: `
      <div class="busy-container" *ngIf="IsBusy">
         <div class="busy-content">
            <mat-spinner diameter="150"></mat-spinner>
         </div>
      </div>
   `,
   styles: [`
      div.busy-container {
         position:fixed;
         top:0; left:0; width:100vw; height:100vh;
         display: flex;
         align-items: center;
         background-color: #fff;
         opacity: 0.5;
         z-index: 1001;
      }
      div.busy-content {
         flex: 1 1 auto;
      }
      mat-spinner {
         margin-left: auto;
         margin-right: auto;
      }
   `]
})
export class BusyComponent implements OnInit {

   constructor(private service: BusyService) { }
   public get IsBusy(): boolean { return this.service.IsBusy; }

   ngOnInit() {
   }
}
