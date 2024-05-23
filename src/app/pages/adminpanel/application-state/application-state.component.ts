import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetlistApplicationstateResponse } from '../../../features/models/responses/applicationstate/getlist-applicationstate-response';
import { GetbyidApplicationstateResponse } from '../../../features/models/responses/applicationstate/getbyid-applicationstate-response';
import { ApplicationStateService } from '../../../features/services/concretes/application-state.service';
import { NotificationsService } from '../../../features/services/concretes/notification-service';
import { CreateApplicationstateRequest } from '../../../features/models/requests/applicationstate/create-applicationstate-request';
import { UpdateApplicationstateRequest } from '../../../features/models/requests/applicationstate/update-applicationstate-request';
import { PageRequest } from '../../../core/models/requests/PageRequest';

@Component({
  selector: 'app-application-state',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './application-state.component.html',
  styleUrl: './application-state.component.scss'
})
export class ApplicationStateComponent {
  postForm!:FormGroup
  updateForm!:FormGroup
  stateName!:string
  applicationStates!:GetlistApplicationstateResponse[]
  applicationState!:GetbyidApplicationstateResponse
 constructor(private formBuilder:FormBuilder, private stateService: ApplicationStateService,private toastService: NotificationsService){}

ngOnInit(){
  this.createPostForm();
  this.createUpdateForm();
  this.setApplicationStatesArrayFunc({ page: 0, pageSize: 100 });
  this.getByIdApplicationStateFunc();
}

 createPostForm(){
  this.postForm=this.formBuilder.group({
    name:[''],
  })
 }

 createUpdateForm(){
  this.updateForm=this.formBuilder.group({
    id:[''],
    name:[''],
  })
 }

 setApplicationStatesArrayFunc(pageRequest:PageRequest){
  this.stateService.getList(pageRequest).subscribe(
    (response)=>{
      this.applicationStates=response.items;
    }
  )
 }

 getByIdApplicationStateFunc(){
  this.stateService.getByIdApplicationState(this.updateForm.value.id).subscribe(
    (response)=>{
      this.applicationState=response;
    }
  )
 }

 postApplicationStateFunc(){
  let createdApplicationState:CreateApplicationstateRequest ={name:this.stateName}
  // let createdApplicationState:CreateApplicationstateRequest=Object.assign({},this.postForm.value)
  this.stateService.postApplicationState(createdApplicationState).subscribe(
    {
      next:(response)=>{
        this.toastService.showSuccess("Başarılı")
        this.setApplicationStatesArrayFunc({ page: 0, pageSize: 100 });
      },
      error:(response)=>{
        console.log(response)
      }
    }
  )
 }

 updateApplicationStateFunc(id:number,stateName:string){
  let updatedApplicationState:UpdateApplicationstateRequest
  ={
    id:id,
    name:stateName
  }
  // let updatedApplicationState:UpdateApplicationstateRequest=Object.assign({},this.updateForm.value)
  this.stateService.updateApplicationState(updatedApplicationState).subscribe(
    {
      next:(response)=>{
        this.toastService.showSuccess("Başarılı")
        this.setApplicationStatesArrayFunc({ page: 0, pageSize: 100 });
      },
      error:(response)=>{
        console.log(response)
      }
    }
  )
 }

 deleteApplicationStateFunc(id:number){
  this.stateService.deleteApplicationState(id).subscribe(
    {
      next:(response)=>{
        this.toastService.showSuccess("Başarılı")
        this.setApplicationStatesArrayFunc({ page: 0, pageSize: 100 });
      },
      error:(response)=>{
        console.log(response)
      }
    }
  )
 }


}
