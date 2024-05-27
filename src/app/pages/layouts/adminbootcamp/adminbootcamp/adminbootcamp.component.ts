import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { NotificationsService } from '../../../../features/services/concretes/notification-service';
import { UpdateBootcampRequest } from '../../../../features/models/requests/bootcamp/update-bootcamp-request';
import { FormBuilder, FormGroup,AbstractControl, FormControl, Validators } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { BootcampListItem } from '../../../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../../../core/models/requests/PageRequest';
import { DeleteBootcampRequest } from '../../../../features/models/requests/bootcamp/delete-bootcamp-request';
import { GetlistBootcampResponse } from '../../../../features/models/responses/bootcamp/getlist-bootcamp-response';
import { CreateBootcampRequest } from '../../../../features/models/requests/bootcamp/create-bootcamp-request';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from '../../../adminpanel/adminpanel.component';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';

@Component({
  selector: 'app-adminbootcamp',
  standalone: true,
  imports: [
    MdbValidationModule,
    FormsModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbDropdownModule,
    MdbRippleModule,
    CommonModule,
    RouterModule,
    AdminpanelComponent,
    AdminLayoutComponent
  ],
  templateUrl: './adminbootcamp.component.html',
  styleUrl: './adminbootcamp.component.scss'
})
export class AdminbootcampComponent {
 //Bootcamp
 selectedBootcampList: GetlistBootcampResponse[] = [];
 deleteForm!: FormGroup;
 form!: FormGroup;
 updateForm!: FormGroup;
 getByIdForm!: FormGroup; 
 bootcampResponse!:GetlistBootcampResponse;

 validationForm: FormGroup;
 claims: string[] = []
   bootcamps: BootcampListItem = {
   index: 0,
   size: 0,
   count: 0,
   hasNext: false,
   hasPrevious: false,
   pages: 0,
   items: [],
 };

 constructor(private formBuilder:FormBuilder,private toastService:NotificationsService,private bootcampService: BootcampService,private authservice: AuthService, private router: Router) {
   this.validationForm = new FormGroup({
     id: new FormControl(null, Validators.required),
     name: new FormControl(null, Validators.required),
     endDate: new FormControl(null, Validators.required),
     startDate: new FormControl(null, Validators.required),
     bootcampstateId: new FormControl(null, Validators.required),
     instructorId: new FormControl(null, Validators.required),
   }); 
 }
 readonly PAGE_SIZE = 50;
 ngOnInit(): void {
   this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
   this.createForm();
   this.deleteCreateForm();
   this.updateCreateForm();
   this.createGetByIdBoostcamp();
 }
 get id(): AbstractControl {
   return this.validationForm.get('id')!;
 }

 get name(): AbstractControl {
   return this.validationForm.get('name')!;
 }

 get endDate(): AbstractControl {
   return this.validationForm.get('endDate')!;
 }

 get startDate(): AbstractControl {
   return this.validationForm.get('startDate')!;
 }
 get bootcampstateId(): AbstractControl {
   return this.validationForm.get('bootcampstateId')!;
 }
 get instructorId(): AbstractControl {
   return this.validationForm.get('instructorId')!;
 }

 getBootcamps(pageRequest: PageRequest) {
   this.bootcampService.getList(pageRequest).subscribe((response) => {
     this.bootcamps = response;
     console.log(response)
     console.log(this.bootcamps)
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

openBootcampDetailModal(bootcamp: any) {
  this.selectedBootcamp = bootcamp;
  const modalId = 'bootcampDetailModal_' + bootcamp.id;
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}

openAddBootcampModal() {
    const modalElement = document.getElementById('addContactModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  closeAddBootcampModal() {
    const modalElement = document.getElementById('addContactModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open'); 
    }
  }
  openDetailModal() {
    const modalId = 'bootcampDetailModal_' + this.selectedBootcamp.id;
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
refresh(): void {
  this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  this.editableRowIndex = null;
  this.editedValues = null;
  this.editedBootcamp = null;
}

editing: boolean = false;

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

editedValues: any;
editedBootcamp: any;
editableRowIndex: number | null = null;
editRow(index: number) {
  if (this.editableRowIndex !== null && this.editableRowIndex !== index) {
    this.saveChanges();
  }
  this.editableRowIndex = index;
  const bootcamp = this.bootcamps.items[index];
  this.editedBootcamp = { ...bootcamp };
  this.editedValues = { ...this.updateForm.value };
  this.updateForm.setValue({
    id: bootcamp.id,
    name: bootcamp.name,
    instructorId: bootcamp.instructorId,
    bootcampStateId: bootcamp.bootcampStateId,
    startDate: this.formatDate(new Date(bootcamp.startDate)),
    endDate: this.formatDate(new Date(bootcamp.endDate))
  });
}

cancelEdit(): void {
  this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  this.editableRowIndex = null;
  this.editedValues = null;
  this.editedBootcamp = null;
}

saveChanges() {
  if (this.editableRowIndex !== null && this.updateForm.valid) {
    const updatedBootcamp: UpdateBootcampRequest = Object.assign({}, this.updateForm.value);
    this.bootcampService.updateBootcamp(updatedBootcamp).subscribe({
      next: () => { 
        this.toastService.showSuccess("Bootcamp Düzenleme İşlemi Başarılı");
        this.cancelEdit();
        this.refresh();
      },
      error: (error) => {
        console.log(error);
        this.toastService.showError("Bootcamp Düzenleme işlemi başarısız");
        this.cancelEdit();
        this.refresh();
      }
    });
  } else if (this.editableRowIndex !== null) {
    this.toastService.showInfo("Lütfen gerekli alanları doldurunuz");
  }
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
    bootcampStateId:['', Validators.required],
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
        this.toastService.showSuccess("Bootcamp ekleme işlemi başarılı")
        window.location.reload();
        this.router.navigate(['adminbootcamps']),{ timeOut: 2500 };
      },
      error:(response)=>{
        this.toastService.showError("Kayıt işlemi başarısız")
      }
    }
  )
}

deleteFunc(){
  console.log(this.deleteForm.value.id)
  if(this.deleteForm.valid){
  }
  this.bootcampService.deleteBootcamp(this.selectedBootcamp.id).subscribe(
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
deleteBootcamp() {
  const bootcampId = this.deleteForm.value.id;
  if (this.deleteForm.valid && bootcampId) {
    this.bootcampService.deleteBootcamp(bootcampId).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Bootcamp Silme İşlemi Başarılı.");
        this.refresh();
      },
      error: (error) => {
        console.error(error);
        this.toastService.showError("Kayıt işlemi başarısız.");
      }
    });
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
        this.cancelEdit()
      },
      error:(response)=>{
        console.log(response)
        this.toastService.showError("Kayıt işlemi başarısız")
        this.cancelEdit()
      }
    }
   ); 
  }else{
    this.toastService.showInfo("Lütfen gerekli alanları doldurunuz")
  }
}
selectedBootcamp: any;
selectedInstructor: any;

selectBootcamp(bootcamps: any) {
this.selectedBootcamp = bootcamps;
}
selectInstructor(bootcamps: any) {
this.selectedInstructor = bootcamps;
this.form.controls['instructorId'].setValue(bootcamps.instructorId);
}

getByIdBootcamp(){
  if (this.getByIdForm.valid) {
    this.bootcampService.getBootcamp(this.getByIdForm.value.id)
    .subscribe(
      (response) => {
        this.selectedBootcamp = response;
        this.toastService.showSuccess("Bootcamp başarıyla alındı.");
      },
      (error) => {
        console.log(error);
        this.toastService.showError("Bootcamp alınırken bir hata oluştu.");
      }
    );
  }
}
}
