import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';
import { ApplicantItemDto } from '../../models/responses/applicant/applicant-item-dto';
import { GetlistApplicantResponse } from '../../models/responses/applicant/getlist-applicant-response';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicantBaseService {

  constructor() { }

  abstract getListApplicant(pageRequest: PageRequest): Observable<ApplicantItemDto>;
  abstract getByIdApplicant(id: string): Observable<GetbyidApplicantResponse>;
  abstract deleteApplicant(id: string): Observable<DeleteApplicantResponse>;
  abstract updateApplicant(applicant: UpdateApplicantRequest): Observable<UpdateApplicantResponse>;
}
