import { Injectable } from '@angular/core';
import { ApplicationBaseService } from '../abstracts/application-base.service';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { CreateApplicationRequest } from '../../models/requests/application/create-application-request';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { ApplicationItemDto } from '../../models/responses/application/application-item-dto';
import { CreateApplicationResponse } from '../../models/responses/application/create-application-response';
import { DeleteApplicationResponse } from '../../models/responses/application/delete-application-response';
import { GetbyidApplicationResponse } from '../../models/responses/application/getbyid-application-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { UpdateApplicationRequest } from '../../models/requests/application/update-application-request';
import { UpdateApplicationResponse } from '../../models/responses/application/update-application-response';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends ApplicationBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private readonly apiUrl = `${environment.API_URL}/ApplicationEntities`;

  override getListApplications(
    pageRequest: PageRequest
  ): Observable<ApplicationItemDto> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };
    return this.httpClient
      .get<ApplicationItemDto>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: ApplicationItemDto = {
            index: pageRequest.page,
            size: pageRequest.pageSize,
            count: response.count,
            hasNext: response.hasNext,
            hasPrevious: response.hasPrevious,
            items: response.items,
            pages: response.pages,
          };
          return newResponse;
        })
      );
  }
  override postApplication(
    application: CreateApplicationRequest
  ): Observable<CreateApplicationResponse> {
    return this.httpClient.post<CreateApplicationResponse>(
      `${this.apiUrl}/`,
      application
    );
  }
  override deleteApplication(
    id: number
  ): Observable<DeleteApplicationResponse> {
    return this.httpClient.delete<DeleteApplicationResponse>(
      `${this.apiUrl}/` + id
    );
  }
  override updateApplication(
    application: UpdateApplicationRequest
  ): Observable<UpdateApplicationResponse> {
    return this.httpClient.put<UpdateApplicationResponse>(
      `${this.apiUrl}/`,
      application
    );
  }
  override getByIdApplication(
    id: number
  ): Observable<GetbyidApplicationResponse> {
    return this.httpClient
      .get<GetbyidApplicationResponse>(`${this.apiUrl}/` + id)
      .pipe(
        map((response) => {
          const newResponse: GetbyidApplicationResponse = {
            id: response.id,
            applicantId: response.applicantId,
            bootcampId: response.bootcampId,
            applicationStateId: response.applicationStateId,
          };
          return newResponse;
        })
      );
  }

  override addApplication(
    createApplicationRequest: CreateApplicationRequest
  ): Observable<CreateApplicationResponse> {
    return this.httpClient.post<CreateApplicationResponse>(
      `${this.apiUrl}`,
      createApplicationRequest
    );
  }
}
