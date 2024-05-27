import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { InstructorListItem } from '../../features/models/responses/instructor/instructorItemDto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { NotificationsService } from '../../features/services/concretes/notification-service';
import { DeleteBootcampRequest } from '../../features/models/requests/bootcamp/delete-bootcamp-request';
import { UpdateBootcampRequest } from '../../features/models/requests/bootcamp/update-bootcamp-request';
import { GetlistBootcampResponse } from '../../features/models/responses/bootcamp/getlist-bootcamp-response';
import { CreateBootcampRequest } from '../../features/models/requests/bootcamp/create-bootcamp-request';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { Router, RouterModule } from '@angular/router';
import { GetlistInstructorResponse } from '../../features/models/responses/instructor/getlist-instructor-response';
import { CreateInstructorRequest } from '../../features/models/requests/instructor/create-instructor-request';
import { UpdateInstructorRequest } from '../../features/models/requests/instructor/update-instructor-request';
import { AdminbootcampComponent } from '../layouts/adminbootcamp/adminbootcamp/adminbootcamp.component';
import { AdmininstructorsComponent } from '../layouts/admininstructors/admininstructors/admininstructors.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';


@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [RouterModule,MdbValidationModule,FormsModule,MdbFormsModule,ReactiveFormsModule,MdbDropdownModule,MdbRippleModule,CommonModule,AdminbootcampComponent,AdmininstructorsComponent,AdminLayoutComponent],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {
  // Instructor
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


  constructor(private formBuilder:FormBuilder,private toastService:NotificationsService,private bootcampService: BootcampService,private instructorService: InstructorService,private authservice: AuthService, private router: Router) {
    this.validationForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      bootcampstateId: new FormControl(null, Validators.required),
      instructorId: new FormControl(null, Validators.required),
    }); 
  }
  readonly PAGE_SIZE = 25;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
    this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
    this.createForm();
    this.deleteCreateForm();
    this.updateCreateForm();
    this.createGetByIdBoostcamp();
    this.createInstructorForm();
    this.updateInstructorForm();
    this.deleteInstructorForm();
    this.getInstructorByIdForm();
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
    getInstructors(pageRequest: PageRequest) {
      this.instructorService.getList(pageRequest).subscribe((response) => {
        this.instructors = response;
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

  sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      document.querySelector('.sidebar')?.classList.remove('open');
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      document.querySelector('.sidebar')?.classList.add('open');
      document.querySelector('.sidebar')?.classList.remove('open');
    }
  }
// TEST
openBootcampDetailModal(bootcamp: any) {
  this.selectedBootcamp = bootcamp;
  const modalElement = document.getElementById('bootcampDetailModal');
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

refresh(): void {
  // Refresh contacts list
}

editing: boolean = false;
editContact(bootcampId: number) {
  this.selectedBootcamp = this.bootcamps.items.find((b: any) => b.id === bootcampId);
  if (this.selectedBootcamp) {
    this.getByIdBootcamp();
    this.updateForm.patchValue(this.selectedBootcamp);
    this.editing = true;
    
  }
}

// //////////////
  currentSection: string = 'adminpanel';
  currentSections: string = 'adminpanel';
  showSection(section: string) {
    this.currentSection = section;
}
showSections(section: string) {
  this.currentSections = section;
}
showSectionss(section: string) {
  if (section === 'adminpanel') {
      this.currentSection = 'bootcamps';
  }
}



editRow(type: string) {
  this.editing = true;
  if (type === 'bootcamp') {
    this.getByIdBootcamp();
  } else if (type === 'instructor') {
    this.getInstructorByIdFunc();
  }
}
editRows() {
  this.editing = true;
  this.getByIdBootcamp();
}

cancelEdit() {
  this.editing = false;
}

saveChanges() {
  if (this.editing) {
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
     let updatedBootcamp:UpdateBootcampRequest = Object.assign({}, this.updateForm.value);
     console.log(updatedBootcamp)
     this.bootcampService.updateBootcamp(updatedBootcamp).subscribe(
      {
        next:(response)=>{
          this.toastService.showError("Başarılı")
        },
        error:(response)=>{
          console.log(response)
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
     ); 
    }else{
      this.toastService.showInfo("Lütfen gerekli alanları doldurunuz")
    }
  }
}
saveChangesForInstructors() {
  if (this.editing) {
    console.log(this.updateFormI.value)
    if (this.updateFormI.valid) {
     let updatedInstructor:UpdateInstructorRequest = Object.assign({}, this.updateFormI.value);
     console.log(updatedInstructor)
     this.instructorService.updateInstructor(updatedInstructor).subscribe(
      {
        next:(response)=>{
          this.toastService.showError("Başarılı")
        },
        error:(response)=>{
          console.log(response)
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
     ); 
    }else{
      this.toastService.showInfo("Lütfen gerekli alanları doldurunuz")
    }
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
        this.toastService.showSuccess("Eğitmen başarıyla oluşturuldu.")
        this.getInstructorByIdFunc()
      },
      error:(response)=>{
        console.log(response)
        this.toastService.showError("Eksik yada hatalı bir giriş yaptınız.")
      }
    }
  )

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
  // BOOTCAMP CRUD
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
          this.toastService.showSuccess("Bootcamp ekleme işlemi başarılı")
          window.location.reload();
          this.router.navigate(['adminpanel']) 
          this.showSectionss('bootcamps'),{ timeOut: 2500 };
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
selectInstructor(instructors: any) {
  this.selectedInstructor = instructors;
  this.form.controls['instructorId'].setValue(instructors.id);
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