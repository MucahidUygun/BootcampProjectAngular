import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { GetlistInstructorResponse } from '../../features/models/responses/instructor/getlist-instructor-response';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateInstructorRequest } from '../../features/models/requests/instructor/create-instructor-request';
import { NotificationsService } from '../../features/services/concretes/notification-service';
import { UpdateInstructorRequest } from '../../features/models/requests/instructor/update-instructor-request';
import { AlertModule } from '@coreui/angular';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs'; 


@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, AlertModule, MdbFormsModule, MdbTabsModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent{
  createForm!: FormGroup;
  updateForm!: FormGroup;
  deleteForm!: FormGroup;
  getByIdForm!: FormGroup;
  instructorResponse!: GetlistInstructorResponse;
  
  constructor(private instructorService: InstructorService, private formBuilder: FormBuilder, private toastService: NotificationsService) {}
  ngOnInit() {
    this.createInstructorForm();
    this.updateInstructorForm();
    this.deleteInstructorForm();
    this.getInstructorByIdForm();

  }

  createInstructorForm(){
    this.createForm = this.formBuilder.group({
      userName:['',Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      companyName:['', Validators.required],
      dateOfBirth:['', Validators.required],
      nationalIdentity:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required,],
      
    });
  }
  updateInstructorForm(){
    this.updateForm = this.formBuilder.group({
      id:['', Validators.required],
      userName:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      companyName:['', Validators.required],
      dateOfBirth:['', Validators.required],
      nationalIdentity:['',Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      
    })
  }
  deleteInstructorForm(){
    this.deleteForm = this.formBuilder.group({
      id:['', Validators.required]
    })
  }
  getInstructorByIdForm(){
    this.getByIdForm = this.formBuilder.group({
      id:['', Validators.required]
    })
  }
  createInstructorFunc(){
    let createInstructor:CreateInstructorRequest=Object.assign({}, this.createForm.value)

    this.instructorService.postInstructor(createInstructor).subscribe(
      {
        next:(response)=>{
          console.log(response)
          this.toastService.showSuccess("Eğitmen başarıyla oluşturuldu.")
        },
        error:(response)=>{
          console.log(response)
          this.toastService.showError("Eksik yada hatalı bir giriş yaptınız.")
        }
      }
    )

  }
  deleteInstructorFunc() {
    console.log(this.deleteForm.value.id)
    if (this.deleteForm.valid) {
      this.instructorService.deleteInstructor(this.deleteForm.value.id).subscribe({
        next: (response) => {
          console.log(response);
          this.toastService.showSuccess("Silme işlemi başarıyla gerçekleştirildi.");
        },
        error: (response) => {
          console.log(response);
          this.toastService.showError("Eksik veya hatalı bir giriş yaptınız.");
        }
      });
    } else {
      this.toastService.showError("Lütfen gerekli alanları doldurunuz.");
    }
  }
  updateInstructorFunc(){
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
     let updatedInstructor:UpdateInstructorRequest = Object.assign({}, this.updateForm.value);
     console.log(updatedInstructor)
     this.instructorService.updateInstructor(updatedInstructor).subscribe(
      {
        next:(response)=>{
          console.log(response)
          this.toastService.showSuccess("Eğitmen bilgileri başarıyla güncellendi.")
        },
        error:(response)=>{
          console.log(response)
          this.toastService.showError("Hatalı bir giriş yaptınız.")
        }
      }
     ); 
    }else{
      this.toastService.showError("Lütfen gerekli alanları doldurunuz")
    }
  }
  getInstructorByIdFunc() {
    if (this.getByIdForm.valid) {
      this.instructorService.getInstructor(this.getByIdForm.value.id).subscribe({
        next: (response) => {
          this.instructorResponse = response;
          this.toastService.showSuccess("Eğitmen başarıyla getirildi.");
          console.log(this.instructorResponse);
        },
        error: (response) => {
          console.log(response);
          this.toastService.showError("Eksik veya hatalı bir giriş yaptınız.");
        }
      });
    } else {
      this.toastService.showError("Lütfen geçerli bir eğitmen ID giriniz.");
    }
  
  }


}
