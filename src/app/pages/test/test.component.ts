import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateBootcampRequest } from '../../features/models/requests/bootcamp/create-bootcamp-request';
import { NotificationsService } from '../../features/services/concretes/notification-service';
import { BootcampStateService } from '../../features/services/concretes/bootcamp-state.service';
import { UpdateBootcampstateRequest } from '../../features/models/requests/bootcampstate/update-bootcampstate-request';
import { GetbyidBootcampstateResponse } from '../../features/models/responses/bootcampstate/getbyid-bootcampstate-response';
import { BootcampStateListItem } from '../../features/models/responses/bootcampstate/bootcampState-List-Item';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule,FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  deleteBootcampStateForm!: FormGroup;
  bootcampStateForm!: FormGroup;
  updateBootcampStateForm!: FormGroup;
  getByIdBootcampStateForm!: FormGroup;
  bootcampStateResponse!:GetbyidBootcampstateResponse;
  bootcampStateList!:BootcampStateListItem;
  constructor(private formBuilder:FormBuilder,private bootcampStateService:BootcampStateService,private toastService:NotificationsService) { }

  ngOnInit() {
    this.createBootcampStateForm();
    this.deleteBootcampStateCreateForm();
    this.updateBootcampStateCreateForm();
    this.createGetByIdBoostcamp();
    this.getAllBootcampState({ page: 0, pageSize: 10 });
  }

  createBootcampStateForm(){
    this.bootcampStateForm = this.formBuilder.group({
      name:['', Validators.required],
    });
  }

  createGetByIdBoostcamp(){
    this.getByIdBootcampStateForm = this.formBuilder.group({
      id:['', Validators.required]
    });
  }

  updateBootcampStateCreateForm(){
    this.updateBootcampStateForm = this.formBuilder.group({
      id:['', Validators.required],
      name:['', Validators.required],
    });
  }

  deleteBootcampStateCreateForm() {
    this.deleteBootcampStateForm = this.formBuilder.group({
      id:['', Validators.required]
    });
  }

  getAllBootcampState(pageRequest:PageRequest){
    this.bootcampStateService.getListBootcampState(pageRequest).subscribe(
     (response)=>{
      this.bootcampStateList = response
     } 
    );
  }

  postBootcampStateForm(){
    let createdBootcampState:CreateBootcampRequest=Object.assign({}, this.bootcampStateForm.value)

    this.bootcampStateService.addBootcampState(createdBootcampState).subscribe(
      {
        next:(response)=>{
          this.toastService.showSuccess("Başarılı")
        },
        error:(response)=>{
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
    )

  }

  deleteBootcampStateFunc(){
    if(this.deleteBootcampStateForm.valid){
      this.bootcampStateService.deleteBootcampState(this.deleteBootcampStateForm.value.id).subscribe(
        {
          next:(response)=>{
            this.toastService.showSuccess("Başarılı")
          },
          error:(response)=>{
            console.log(response)
            this.toastService.showError("Kayıt işlemi başarısız")
          }
        }
      )
    }
  }

  updateBootcampStateFunc(){
    console.log(this.updateBootcampStateForm.value)
    if (this.updateBootcampStateForm.valid) {
     let updatedBootcampState:UpdateBootcampstateRequest = Object.assign({}, this.updateBootcampStateForm.value);
     console.log(updatedBootcampState)
     this.bootcampStateService.updateBootcampState(updatedBootcampState).subscribe(
      {
        next:(response)=>{
          this.toastService.showSuccess("Başarılı")
        },
        error:(response)=>{
          console.log(response)
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
     ); 
    }else{
      this.toastService.showError("Lütfen gerekli alanları doldurunuz")
    }
  }

  getByIdBootcampState(){
    if (this.getByIdBootcampStateForm.valid) {
      this.bootcampStateService.getByIdBootcmapState(this.getByIdBootcampStateForm.value.id)
      .subscribe(
        {
          next:(response)=>{
            this.bootcampStateResponse = response;
            this.toastService.showSuccess("Başarılı")
            console.log(this.bootcampStateResponse)
          },
          error:(response)=>{
            console.log(response)
            this.toastService.showError("Kayıt işlemi başarısız")
          }
        }
      );
    }
  }

}
