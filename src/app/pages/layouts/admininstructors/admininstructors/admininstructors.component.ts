import { Component } from '@angular/core';
import { NotificationsService } from '../../../../features/services/concretes/notification-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { InstructorListItem } from '../../../../features/models/responses/instructor/instructorItemDto';
import { GetlistInstructorResponse } from '../../../../features/models/responses/instructor/getlist-instructor-response';
import { CreateInstructorRequest } from '../../../../features/models/requests/instructor/create-instructor-request';
import { UpdateInstructorRequest } from '../../../../features/models/requests/instructor/update-instructor-request';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { PageRequest } from '../../../../core/models/requests/PageRequest';

@Component({
  selector: 'app-admininstructors',
  standalone: true,
  imports: [
    MdbValidationModule,
    FormsModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbDropdownModule,
    MdbRippleModule,
    CommonModule
  ],
  templateUrl: './admininstructors.component.html',
  styleUrl: './admininstructors.component.scss'
})
export class AdmininstructorsComponent {
 // Instructor
 claims: string[] = []
 selectedInstructorList: GetlistInstructorResponse[] = [];
 deleteFormI!: FormGroup;
 updateFormI!: FormGroup;
 getByIdFormI!: FormGroup;
 formI!:FormGroup;
 instructorResponse!: GetlistInstructorResponse;
 instructors: InstructorListItem = {
   index: 0,
   size: 0,
   count: 0,
   hasNext: false,
   hasPrevious: false,
   pages: 0,
   items: [],
 };

 constructor(private formBuilder:FormBuilder,private toastService:NotificationsService,private instructorService: InstructorService,private authservice: AuthService, private router: Router) {
}
readonly PAGE_SIZE = 35;
ngOnInit(): void {
  this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
  this.createInstructorForm();
  this.updateInstructorForm();
  this.deleteInstructorForm();
  this.getInstructorByIdForm();
}
  getInstructors(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructors = response;
      console.log(response)
      console.log(this.instructors)
    });
}

isAdmin() {
  if (this.claims.includes("admin" && "Admin")) {
    return true;
  }
  else {
    return false;
  }
}

openInstructorDetailModal(instructor: any) {
const modalElement = document.getElementById('instructorDetailModal');
if (modalElement) {
  modalElement.classList.add('show');
  modalElement.style.display = 'block';
  document.body.classList.add('modal-open');
}
}
openAddInstructorModal() {
  const modalElement = document.getElementById('addInstructorModal');
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}
closeAddInstructorModal() {
  const modalElement = document.getElementById('addInstructorModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open'); 
  }
}

refresh(): void {
  this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
  this.editableRowIndex = null;
  this.editedValues = null;
  this.editedInstructor = null;
}

editing: boolean = false;
currentSection: string = 'adminpanel';
editedValues: any;
editedInstructor: any;
editableRowIndex: number | null = null;

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
editRow(index: number) {
  if (this.editableRowIndex !== null && this.editableRowIndex !== index) {
    this.saveChanges();
  }
  this.updateFormI.controls['password'].enable();
  
  this.editableRowIndex = index;
  const instructor = this.instructors.items[index];
  
  this.updateFormI.patchValue({
    id: instructor.id,
    firstName: instructor.firstName,
    lastName: instructor.lastName,
    userName: instructor.userName,
    companyName: instructor.companyName,
    dateOfBirth: this.formatDate(new Date(instructor.dateOfBirth)),
    nationalIdentity: instructor.nationalIdentity,
    email: instructor.email,
    password: instructor.password
  });

  this.editedInstructor = { ...instructor };
  this.editedValues = { ...this.updateFormI.value };
}

cancelEdit(): void {
  this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
  this.editableRowIndex = null;
  this.editedValues = null;
  this.editedInstructor = null;
}
saveChanges() {
  if (this.editableRowIndex !== null && this.updateFormI.valid) {
    const updatedInstructor: UpdateInstructorRequest = Object.assign({}, this.updateFormI.value);
    this.instructorService.updateInstructor(updatedInstructor).subscribe({
      next: () => { 
        this.toastService.showSuccess("İnstructor Düzenleme İşlemi Başarılı");
        this.cancelEdit();
        this.refresh();
      },
      error: (error) => {
        console.log(error);
        this.toastService.showError("İnstructor Düzenleme işlemi başarısız");
        this.cancelEdit();
        this.refresh();
      }
    });
  } else if (this.editableRowIndex !== null) {
    this.toastService.showInfo("Lütfen gerekli alanları doldurunuz");
  }
}
saveChangesForInstructors() {
  if (this.editableRowIndex !== null && this.updateFormI.valid) {
    const updatedInstructor: UpdateInstructorRequest = Object.assign({}, this.updateFormI.value);
    this.instructorService.updateInstructor(updatedInstructor).subscribe({
      next: () => { 
        this.toastService.showSuccess("İnstructor Düzenleme İşlemi Başarılı");
        this.cancelEdit();
        this.refresh();
      },
      error: (error) => {
        console.log(error);
        this.toastService.showError("İnstructor Düzenleme işlemi başarısız");
        this.cancelEdit();
        this.refresh();
      }
    });
  } else if (this.editableRowIndex !== null) {
    this.toastService.showInfo("Lütfen gerekli alanları doldurunuz");
  }
}
// Instructor CRUD
createInstructorForm(){
this.formI = this.formBuilder.group({
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
this.updateFormI = this.formBuilder.group({
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
this.deleteFormI = this.formBuilder.group({
  id:['', Validators.required]
})
}
getInstructorByIdForm(){
this.getByIdFormI = this.formBuilder.group({
  id:['', Validators.required]
})
}
createInstructorFunc(){
let createInstructor:CreateInstructorRequest=Object.assign({}, this.formI.value)
this.instructorService.postInstructor(createInstructor).subscribe(
  {
    next:(response)=>{
      console.log(response)
      this.toastService.showSuccess("İnstructor başarıyla oluşturuldu.")
      window.location.reload();
      this.router.navigate(['admininstructors']) ,{ timeOut: 2500 };
      this.refresh();
    },
    error:(response)=>{
      console.log(response)
      this.toastService.showError("Eksik yada hatalı bir giriş yaptınız.")
    }
  }
)
}

selectedInstructor: any;
selectInstructor(instructors: any) {
  this.selectedInstructor = instructors;
  this.formI.controls['instructorId'].setValue(instructors.id);
}
deleteInstructorFunc() {
console.log(this.deleteFormI.value.id)
if (this.deleteFormI.valid) {}
  this.instructorService.deleteInstructor(this.selectedInstructor.id).subscribe({
    next: (response) => {
      console.log(response);
      this.toastService.showSuccess("Silme işlemi başarıyla gerçekleştirildi.");
    },
    error: (response) => {
      console.log(response);
      this.toastService.showError("Eksik veya hatalı bir giriş yaptınız.");
    }
  });
}
deleteInstructor() {
  const instructorId = this.deleteFormI.value.id;
  if (this.deleteFormI.valid && instructorId) {
    this.instructorService.deleteInstructor(instructorId).subscribe({
      next: (response) => {
        this.toastService.showSuccess("İnstructor Silme İşlemi Başarılı.");
        this.refresh();
      },
      error: (error) => {
        console.error(error);
        this.toastService.showError("Kayıt işlemi başarısız.");
      }
    });
  }
}
updateInstructorFunc(){
console.log(this.updateFormI.value)
if (this.updateFormI.valid) {
 let updatedInstructor:UpdateInstructorRequest = Object.assign({}, this.updateFormI.value);
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
if (this.getByIdFormI.valid) {
  this.instructorService.getInstructor(this.getByIdFormI.value.id).subscribe({
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
