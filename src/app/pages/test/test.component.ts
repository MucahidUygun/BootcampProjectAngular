import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateBootcampRequest } from '../../features/models/requests/bootcamp/create-bootcamp-request';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { NotificationsService } from '../../features/services/concretes/notification-service';
import { DeleteBootcampRequest } from '../../features/models/requests/bootcamp/delete-bootcamp-request';
import { UpdateBootcampRequest } from '../../features/models/requests/bootcamp/update-bootcamp-request';
import { GetlistBootcampResponse } from '../../features/models/responses/bootcamp/getlist-bootcamp-response';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  deleteForm!: FormGroup;
  form!: FormGroup;
  updateForm!: FormGroup;
  getByIdForm!: FormGroup;
  bootcampResponse!:GetlistBootcampResponse;
  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,private toastService:NotificationsService) { }

  ngOnInit() {
    this.createForm();
    this.deleteCreateForm();
    this.updateCreateForm();
    this.createGetByIdBoostcamp();
  }

  createForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      instructorId:['', Validators.required],
      bootcampstateId:['', Validators.required],
      startDate:['', Validators.required],
      endDate:['', Validators.required]
    });
  }

  createGetByIdBoostcamp(){
    this.getByIdForm = this.formBuilder.group({
      id:['', Validators.required]
    });
  }

  updateCreateForm(){
    this.updateForm = this.formBuilder.group({
      id:['', Validators.required],
      name:['', Validators.required],
      instructorId:['', Validators.required],
      bootcampstateId:['', Validators.required],
      startDate:['', Validators.required],
      endDate:['', Validators.required]
    });
  }

  deleteCreateForm() {
    this.deleteForm = this.formBuilder.group({
      id:['', Validators.required]
    });
  }

  postForm(){
    let createdBootcamp:CreateBootcampRequest=Object.assign({}, this.form.value)

    this.bootcampService.postBootcamp(createdBootcamp).subscribe(
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

  deleteFunc(){
    if(this.deleteForm.valid){
      this.bootcampService.deleteBootcamp(this.deleteForm.value.id).subscribe(
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

  updateFunc(){
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
     let updatedBootcamp:UpdateBootcampRequest = Object.assign({}, this.updateForm.value);
     console.log(updatedBootcamp)
     this.bootcampService.updateBootcamp(updatedBootcamp).subscribe(
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

  getByIdBootcamp(){
    if (this.getByIdForm.valid) {
      this.bootcampService.getBootcamp(this.getByIdForm.value.id)
      .subscribe(
        {
          next:(response)=>{
            this.bootcampResponse = response;
            this.toastService.showSuccess("Başarılı")
            console.log(this.bootcampResponse)
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
