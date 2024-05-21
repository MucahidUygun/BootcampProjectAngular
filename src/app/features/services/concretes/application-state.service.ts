import { Injectable } from '@angular/core';
import { ApplicationStateBaseService } from '../abstracts/application-state-base.service';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CreateApplicationstateRequest } from '../../models/requests/applicationstate/create-applicationstate-request';
import { UpdateApplicationstateRequest } from '../../models/requests/applicationstate/update-applicationstate-request';
import { ApplicationStateItemDto } from '../../models/responses/applicationstate/application-state-item-dto';
import { CreateApplicationstateResponse } from '../../models/responses/applicationstate/create-applicationstate-response';
import { DeleteApplicationstateResponse } from '../../models/responses/applicationstate/delete-applicationstate-response';
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response';
import { UpdateApplicationstateResponse } from '../../models/responses/applicationstate/update-applicationstate-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService extends ApplicationStateBaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  private readonly apiUrl: string = `${environment.API_URL}/applicationstates`;

  override getList(pageRequest: PageRequest): Observable<ApplicationStateItemDto> {

    const newRequest:{[key:string]:string | number}={
      page:pageRequest.page,
      pageSize:pageRequest.pageSize
    };

    return this.httpClient.get<ApplicationStateItemDto>(this.apiUrl,{
      params:newRequest
    }
  ).pipe(
    map((response)=>{
      const newResponse:ApplicationStateItemDto={
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
  )


  }
  override postApplicationState(applicationState: CreateApplicationstateRequest): Observable<CreateApplicationstateResponse> {
    return this.httpClient.post<CreateApplicationstateResponse>(this.apiUrl,applicationState);
  }
  override deleteApplicationState(id: number): Observable<DeleteApplicationstateResponse> {
    return this.httpClient.delete<DeleteApplicationstateResponse>( `${this.apiUrl}/`+ id);
  }
  override updateApplicationState(applicationState: UpdateApplicationstateRequest): Observable<UpdateApplicationstateResponse> {
    return this.httpClient.put<UpdateApplicationstateResponse>(`${this.apiUrl}`, applicationState);
  }
  override getByIdApplicationState(id: number): Observable<GetbyidApplicationstateResponse> {
    return this.httpClient.get<GetbyidApplicationstateResponse>(`${this.apiUrl}/` + id)
    .pipe(
      map(
        (response)=>{
          const newResponse:GetbyidApplicationstateResponse={
            id:response.id,
            name:response.name,
          };
          return newResponse;
        }
      )
    )
  }

}
