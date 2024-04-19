import { Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { DataResult } from '../../models/DataResult';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BootcampCardComponent } from '../../components/bootcamp-card/bootcamp-card.component';



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,HttpClientModule,NavbarComponent,FormsModule,SharedModule,BootcampCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  @Input() selectedBootcampId!: string;
  @Output() bootcampSelected = new EventEmitter<string>();
  bootcampList:GetlistBootcampResponse[] = [];
  bootcampState:GetlistBootcampstateResponse[] = [];
  currentBootcamp!:GetlistBootcampResponse;
  filterText ="";
  
  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
    this.getListModels();
  }
 getListModels(){
    this.httpClient.get<DataResult<GetlistBootcampResponse[]>>("http://localhost:5278/api/Bootcamps")
    .subscribe({
      next:(response:DataResult<GetlistBootcampResponse[]>)=>{
        console.log("Cevap geldi :",response);
        this.bootcampList=response.data;
      },
      error:(error)=>{console.log("cevap hatalı :",error)},
      complete:()=>{console.log("istek sonlandı")}
    })
  }
  onSelectedBootcamp(bootcampId:string){
    this.selectedBootcampId =bootcampId;
    this.bootcampSelected.emit(this.selectedBootcampId);
  }

  setCurrentBootcamp(bootcamp:GetlistBootcampResponse) {
    this.currentBootcamp = bootcamp;
  }

  getCurrentBootcampClass(bootcamp:GetlistBootcampResponse){
    if (bootcamp=this.currentBootcamp){
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

}
