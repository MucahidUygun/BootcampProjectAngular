import { Injectable } from '@angular/core';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklistre-quest';
import { BlacklistItemDto } from '../../models/responses/blacklist/blacklist-item-dto';
import { CreateBlacklistResponse } from '../../models/responses/blacklist/create-blacklist-response';
import { DeleteBlacklistResponse } from '../../models/responses/blacklist/delete-blacklist-response';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';
import { UpdateBlacklistResponse } from '../../models/responses/blacklist/update-blacklist-response';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {
  constructor(private httpClient:HttpClient) {super() }

  private readonly apiUrl = `${environment.API_URL}/BlackLists`

  override getList(pageRequest: PageRequest): Observable<BlacklistItemDto> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };

    return this.httpClient.get<BlacklistItemDto>(this.apiUrl,{
      params: newRequest,
    }).pipe(
      map((response)=>{
        const newResponse:BlacklistItemDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          items:response.items,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          pages:response.pages
        }
        return newResponse;
      })
    )
  }
  override postBlacklist(blacklist: CreateBlacklistRequest): Observable<CreateBlacklistResponse> {
    return this.httpClient.post<CreateBlacklistResponse>(`${this.apiUrl}/`,blacklist);
  }
  override deleteBlacklist(id: number): Observable<DeleteBlacklistResponse> {
    return this.httpClient.delete<DeleteBlacklistResponse>(`${this.apiUrl}/`+id);
  }
  override updateBlacklist(blacklist: UpdateBlacklistRequest): Observable<UpdateBlacklistResponse> {
    return this.httpClient.put<UpdateBlacklistResponse>(`${this.apiUrl}/`,blacklist)
  }
  override getByIdBlacklist(id: number): Observable<GetbyidBlacklistResponse> {

    return this.httpClient.get<GetbyidBlacklistResponse>(`${this.apiUrl}/`+id).pipe(
      map((response)=>{
        const newResponse:GetbyidBlacklistResponse={
          applicantId: response.applicantId,
          reason: response.reason,
          date: response.date,
          id: response.id,
        }
        return newResponse;
      })
    )
  }

}
