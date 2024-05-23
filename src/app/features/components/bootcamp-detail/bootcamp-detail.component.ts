import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../services/concretes/bootcamp.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../services/concretes/notification-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bootcamp-detail',
  templateUrl: './bootcamp-detail.component.html',
  styleUrls: ['./bootcamp-detail.component.scss'],
})
export class BootcampDetailComponent implements OnInit {
  getByIdForm: FormGroup;
  selectedBootcamp: any;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private toastService: NotificationsService,
    private formBuilder: FormBuilder
  ) {
    this.getByIdForm = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number }) => {
      const bootcampId = params['bootcampId'];
      if (bootcampId) {
        this.getByIdForm.patchValue({ id: +bootcampId });
        this.getByIdBootcamp();
      } else {
        console.log('Bootcamp ID not found in route parameters');
      }
    });
  }
  viewDetails() {
    if (this.getByIdForm.valid) {
      this.getByIdBootcamp();
    } else {
      console.log('Form is invalid');
    }
  }

  getByIdBootcamp() {
    const bootcampId = this.getByIdForm.value.id;
    this.bootcampService.getBootcamp(bootcampId).subscribe(
      (response) => {
        this.selectedBootcamp = response;
        this.toastService.showSuccess('Bootcamp başarıyla alındı.');
      },
      (error) => {
        console.log(error);
        this.toastService.showError('Bootcamp alınırken bir hata oluştu.');
      }
    );
  }
}
