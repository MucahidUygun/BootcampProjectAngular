import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampimageListItemDto } from '../../../features/models/responses/bootcampimage/bootcampimage-list-item-dto';
import { BootcampListItem } from '../../../features/models/responses/bootcamp/bootcampItemDto';
import { BootcampImageService } from '../../../features/services/concretes/bootcamp-image.service';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CreateBootcampimageRequest } from '../../../features/models/requests/bootcampimage/create-bootcampimage-request';
import { UpdateBootcampimageRequest } from '../../../features/models/requests/bootcampimage/update-bootcampimage-request';
import { NotificationsService } from '../../../features/services/concretes/notification-service';


@Component({
  selector: 'app-bootcampimage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './bootcampimage.component.html',
  styleUrl: './bootcampimage.component.scss'
})
export class BootcampImageComponent implements OnInit {

  formMessage: string | null = null;
  bootcampImageUpdateForm: FormGroup;
  bootcampImageCreateForm: FormGroup;
  selectedBootcampImage: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampImageList: BootcampimageListItemDto;
  bootcampList: BootcampListItem;
  submitted = false

  constructor(
    private bootcampImageService: BootcampImageService,
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr: NotificationsService
  ) { }
  readonly PAGE_SIZE = 25;
  ngOnInit(): void {
    this.getBootcampImages({ page: 0, pageSize: this.PAGE_SIZE });
    this.loadBootcampImages();
    this.createBootcampImageForm();
    this.updateBootcampImageForm();
  }
  updateBootcampImageForm() {
    this.bootcampImageUpdateForm = this.formBuilder.group({
      id: [''],
      bootcampId: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }

  createBootcampImageForm() {
    this.bootcampImageCreateForm = this.formBuilder.group({
      imagePath: ['',],
      bootcampId: ['', [Validators.required]],
      file: ['', [Validators.required]]
    })
  }

  loadBootcampImages() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getBootcamps(pageRequest);
    this.getBootcampImages(pageRequest);
  }
  getBootcampImages(pageRequest: PageRequest) {
    this.bootcampImageService.getList(pageRequest).subscribe(response => {
      this.bootcampImageList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
      console.log(response);
    });
  }
  deleteBootcampImage(id: number) {
    if (confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      this.bootcampImageService.delete(id).subscribe({
        next: (response) => {
          this.handleDeleteSuccess();
        },
        error: (error) => {
          console.error('Görsel silme işlemi başarısız:', error);
        }
      });
    }
  }
  handleDeleteSuccess() {
    this.loadBootcampImages();
    this.formMessage = "Görsel başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  add() {
    if (this.bootcampImageCreateForm.valid) {
      let bootcampImage: CreateBootcampimageRequest = Object.assign({}, this.bootcampImageCreateForm.value);
      let formData = new FormData();
      formData.append('bootcampId', bootcampImage.bootcampId.toString());
      formData.append('imagePath', bootcampImage.imagePath);
      formData.append('formFile', bootcampImage.file);
      this.bootcampImageService.create(formData).subscribe({
        next: (response) => {
          this.handleCreateSuccess();
        },
        error: (error) => {
          this.formMessage = "Eklenemedi";
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "Başarıyla Eklendi";
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcampImages();
        }
      });
    }
  }
  handleCreateSuccess() {
    this.loadBootcampImages();
    this.formMessage = "Başarıyla Eklendi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  updateBootcampImage() {
    this.submitted = true;
    if(this.bootcampImageUpdateForm.valid){
    let bootcampImage: UpdateBootcampimageRequest = { ...this.bootcampImageUpdateForm.value, file: this.bootcampImageUpdateForm.get('file').value };
    let formData = new FormData();
    formData.append('id', bootcampImage.id.toString());
    formData.append('bootcampId', bootcampImage.bootcampId.toString());
    formData.append('file', bootcampImage.file);
    this.bootcampImageService.update(formData).subscribe({
      next: () => {
        this.closeModal(); // Modal'ı kapat
        this.loadBootcampImages(); // Verileri yeniden getir
        this.toastr.showSuccess("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.showError('Güncelleme işlemi başarısız:');
      }
    });
  } else {
  //this.markFormGroupTouched(this.bootcampImageUpdateForm); 
}
}
  openUpdateModal(bootcampImage: any) {
    this.bootcampImageService.getById(bootcampImage.id).subscribe({
      next: (response) => {
        this.selectedBootcampImage = { ...response };
        this.bootcampImageUpdateForm.patchValue({
          id: this.selectedBootcampImage.id,
          bootcampId: this.selectedBootcampImage.bootcampId,
          file: this.selectedBootcampImage.file
        });
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.bootcampImageCreateForm.reset();
    this.showCreateModal = true;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.bootcampImageCreateForm?.get('file')?.setValue(file);
  }
  onFileUpdateChange(event: any) {
    const file = event.target.files[0];
    this.bootcampImageUpdateForm?.get('file')?.setValue(file);
  }
}