import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationItemDto } from '../../models/responses/application/application-item-dto';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CreateApplicationRequest } from '../../models/requests/application/create-application-request';
import { CreateApplicationResponse } from '../../models/responses/application/create-application-response';
import { DeleteApplicationResponse } from '../../models/responses/application/delete-application-response';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';
import { UpdateApplicationRequest } from '../../models/requests/application/update-application-request';
import { UpdateApplicationResponse } from '../../models/responses/application/update-application-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationBaseService {

  constructor() { }

  abstract getListApplications(pageRequest: PageRequest):Observable<ApplicationItemDto>;
  abstract postApplication(application:CreateApplicationRequest):Observable<CreateApplicationResponse>;
  abstract deleteApplication(id:number):Observable<DeleteApplicationResponse>;
  abstract updateApplication(application:UpdateApplicationRequest):Observable<UpdateApplicationResponse>;
  abstract getByIdApplication(id:number):Observable<GetbyidApplicationResponse>;


}
