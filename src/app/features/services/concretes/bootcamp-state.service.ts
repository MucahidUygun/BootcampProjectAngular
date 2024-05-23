import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { CreateBootcampstateRequest } from '../../models/requests/bootcampstate/create-bootcampstate-request';
import { CreateBootcampstateResponse } from '../../models/responses/bootcampstate/create-bootcampstate-resonse';
import { DeleteBootcampstateResponse } from '../../models/responses/bootcampstate/delete-bootcampstate-response';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';
import { UpdateBootcampstateResponse } from '../../models/responses/bootcampstate/update-bootcampstate-response';
import { BootcampStateListItem } from '../../models/responses/bootcampstate/bootcampState-List-Item';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService {

  constructor(private httpClient:HttpClient) {super();} 

  private readonly apiUrl: string = `${environment.API_URL}/bootcampstates`; 
  
  override getListBootcampState(pageRequest: PageRequest): Observable<BootcampStateListItem> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };
    return this.httpClient
      .get<BootcampStateListItem>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: BootcampStateListItem = {
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
  override getByIdBootcmapState(id: number): Observable<GetbyidBootcampstateResponse> {
    return this.httpClient.get<GetbyidBootcampstateResponse>(`${this.apiUrl}/` + id)
    .pipe(
      map(
        (response)=>{
          const newResponse:GetbyidBootcampstateResponse = {
            id:response.id,
            name:response.name,
          }
          return newResponse;
        }
      )
    )
  }
  override addBootcampState(bootcampState: CreateBootcampstateRequest): Observable<CreateBootcampstateResponse> {
    return this.httpClient.post<CreateBootcampstateResponse>(`${this.apiUrl}/` , bootcampState);
  }
  override deleteBootcampState(id: number): Observable<DeleteBootcampstateResponse> {
    return this.httpClient.delete<DeleteBootcampstateResponse>(`${this.apiUrl}/` + id);
  }
  override updateBootcampState(bootcampState: CreateBootcampstateRequest): Observable<UpdateBootcampstateResponse> {
    return this.httpClient.put<CreateBootcampstateResponse>(`${this.apiUrl}/` ,bootcampState);
  }
  

}
