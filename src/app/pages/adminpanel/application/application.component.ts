import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GetlistApplicationResponse } from '../../../features/models/responses/application/getlist-application-response';
import { GetlistBootcampResponse } from '../../../features/models/responses/bootcamp/GetListBootcampResponse';
import { GetlistApplicationstateResponse } from '../../../features/models/responses/applicationstate/getlist-applicationstate-response';
import { GetlistApplicantResponse } from '../../../features/models/responses/applicant/getlist-applicant-response';
import { CreateApplicationRequest } from '../../../features/models/requests/application/create-application-request';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { ApplicationStateService } from '../../../features/services/concretes/application-state.service';
import { ApplicationService } from '../../../features/services/concretes/application.service';
import { NotificationsService } from '../../../features/services/concretes/notification-service';
import { ApplicantService } from '../../../features/services/concretes/applicant.service';
import { UpdateApplicationRequest } from '../../../features/models/requests/application/update-application-request';
import { PageRequest } from '../../../core/models/requests/PageRequest';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  applications!: GetlistApplicationResponse[]
  bootcamps!: GetlistBootcampResponse[]
  applicationStates!: GetlistApplicationstateResponse[]
  applicants!: GetlistApplicantResponse[]
  createdApplication: CreateApplicationRequest={
    applicantId: '',
    bootcampId: 0,
    applicationStateId: 0
  }
  defaultMessage: string = 'Lütfen Bir Değer Seçiniz'
  constructor(
    private bootcampService: BootcampService,
    private applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private toastService: NotificationsService,
    private applicantService: ApplicantService
  ) { }

  ngOnInit() {
    this.setApplicatonArrayFunc({ page: 0, pageSize: 100 })
  }

  onOptionsChange(item: any, newValue: any) {
    item.value = newValue
  }


  setApplicantArrayFunc() {
    this.applicantService.getListApplicant({ page: 0, pageSize: 100 }).subscribe(
      (response) => {
        this.applicants = response.items;
      }
    )
  }

  setBootcampArrayFunc() {
    this.bootcampService.getList({ page: 0, pageSize: 100 }).subscribe(
      (response) => {
        this.bootcamps = response.items;
      }
    )
  }

  setApplicationStatesArrayFunc() {
    this.applicationStateService.getList({ page: 0, pageSize: 100 }).subscribe(
      (response) => {
        this.applicationStates = response.items;
      }
    )
  }

  setApplicatonArrayFunc(pageRequest: PageRequest) {
    this.setApplicationStatesArrayFunc()
    this.setBootcampArrayFunc()
    this.setApplicantArrayFunc()
    this.applicationService.getListApplications(pageRequest).subscribe(
      (response) => {
        this.applications = response.items;
      }
    )
  }

  postApplicationFunc() {

    console.log(this.createdApplication)
    this.applicationService.postApplication(this.createdApplication).subscribe(
      {
        next: (response) => {
          this.toastService.showSuccess("Başarılı")
          this.setApplicatonArrayFunc({ page: 0, pageSize: 100 })
          this.clearApplicationFunc()
        },
        error: (response) => {
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
    )
  }

  clearApplicationFunc() {
    this.createdApplication = {
      applicantId: '',
      bootcampId: 0,
      applicationStateId: 0
    }
  }

  deleteApplicationFunc(id: number) {
    this.applicationService.deleteApplication(id).subscribe(
      {
        next: (response) => {
          this.toastService.showSuccess("Başarılı")
          this.setApplicatonArrayFunc({ page: 0, pageSize: 100 })
        },
        error: (response) => {
          console.log(response)
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
    )
  }
  updateApplicationFunc(updateApplication:UpdateApplicationRequest) {
    this.applicationService.updateApplication(updateApplication).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.toastService.showSuccess("Başarılı")
        },
        error: (response) => {
          console.log(response)
          this.toastService.showError("Kayıt işlemi başarısız")
        }
      }
    )
  }
}
