import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../services/concretes/bootcamp.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationsService } from '../../services/concretes/notification-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';
import { LocalStorageService } from '@coreui/angular';
import { AuthService } from '../../services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BootcampCardComponent } from '../bootcamp-card/bootcamp-card.component';
import { CreateApplicantRequest } from '../../models/requests/applicant/create-applicant-request';
import { CreateApplicationRequest } from '../../models/requests/application/create-application-request';
import { ApplicationService } from '../../services/concretes/application.service';

@Component({
  selector: 'app-bootcamp-detail',
  templateUrl: './bootcamp-detail.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BootcampCardComponent,
  ],
  styleUrls: ['./bootcamp-detail.component.scss'],
})
export class BootcampDetailComponent implements OnInit {
  getByIdForm: FormGroup;
  selectedBootcamp: any;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private toastService: NotificationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private applicationServive: ApplicationService
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

  goToApplicationForm(): void {
    this.router.navigate(['/application-form']);
  }

  goToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  getDuration(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInWeeks =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7);
    return Math.round(durationInWeeks);
  }

  addApplication(bootcampId: number) {
    const token = this.authService.getDecodedToken();
    console.log(
      token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ]
    );

    const createApplicationRequest: CreateApplicationRequest = {
      bootcampId: bootcampId,
      applicantId:
        token[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],
      applicationStateId: 2,
    };

    this.applicationServive
      .addApplication(createApplicationRequest)
      .subscribe((response: any) => {
        console.log('application yapıldı');
      });
  }
}
