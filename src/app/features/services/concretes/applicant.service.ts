import { Injectable } from '@angular/core';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { UpdateApplicantRequest } from '../../models/requests/applicant/update-applicant-request';
import { ApplicantItemDto } from '../../models/responses/applicant/applicant-item-dto';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { GetlistApplicantResponse } from '../../models/responses/applicant/getlist-applicant-response';
import { UpdateApplicantResponse } from '../../models/responses/applicant/update-applicant-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {

  constructor(private httpClient: HttpClient) { super() }
  
  private readonly apiUrl: string = `${environment.API_URL}/applicants`;
  override getListApplicant(pageRequest: PageRequest): Observable<ApplicantItemDto> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };
    return this.httpClient.get<ApplicantItemDto>(this.apiUrl, { params: newRequest })
    .pipe(
      map((response)=>{
        const newResponse:ApplicantItemDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages,
        }
        return newResponse;
      })
    );
  }
  override getByIdApplicant(id: string): Observable<GetbyidApplicantResponse> {
    return this.httpClient.get<GetbyidApplicantResponse>(`${this.apiUrl}/` + id)
    .pipe(
      map((response)=>{
        const newResponse:GetbyidApplicantResponse={
          id:response.id,
          userName:response.userName,
          firstName:response.firstName,
          lastName:response.lastName,
          about:response.about,
          dateOfBirth:response.dateOfBirth,
          nationalIdentity:response.nationalIdentity,
          email:response.email,
          password:response.password,
          updatedDate:response.updatedDate,
        }
        return newResponse;
      })
    )
  }
  override deleteApplicant(id: string): Observable<DeleteApplicantResponse> {
    return this.httpClient.delete<DeleteApplicantResponse>(`${this.apiUrl}/` + id);
  }
  override updateApplicant(applicant: UpdateApplicantRequest): Observable<UpdateApplicantResponse> {
    return this.httpClient.put<UpdateApplicantResponse>(`${this.apiUrl}/`,applicant)
  }

}
