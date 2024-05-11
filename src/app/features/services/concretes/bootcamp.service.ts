import { Injectable } from "@angular/core";
import { BootcampBaseService } from "../abstracts/bootcamp-base.service";
import { environment } from "../../../../environments/enviroment";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BootcampListItem } from "../../models/responses/bootcamp/bootcampItemDto";
import { PageRequest } from "../../../core/models/requests/PageRequest";
import { CreateBootcampRequest } from "../../models/requests/bootcamp/create-bootcamp-request";
import { CreateBootcampResponse } from "../../models/responses/bootcamp/create-bootcamp-response";
import { DeleteBootcampRequest } from "../../models/requests/bootcamp/delete-bootcamp-request";
import { DeleteBootcampResponse } from "../../models/responses/bootcamp/delete-bootcamp-response";
import { UpdateBootcampRequest } from "../../models/requests/bootcamp/update-bootcamp-request";
import { UpdateBootcampesponse } from "../../models/responses/bootcamp/update-bootcamp-response";
import { GetlistBootcampResponse } from "../../models/responses/bootcamp/getlist-bootcamp-response";


@Injectable({
  providedIn: 'root',
})
export class BootcampService extends BootcampBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private readonly apiUrl: string = `${environment.API_URL}/bootcamps`;

  override getList(
    pageRequest: PageRequest
  ): Observable<BootcampListItem> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };

    return this.httpClient
      .get<BootcampListItem>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: BootcampListItem = {
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
  override getBootcamp(id: number): Observable<GetlistBootcampResponse> {
    return this.httpClient.get<GetlistBootcampResponse>(`${this.apiUrl}/` + id)
    .pipe(
      map((response) => {
        const newResponse: GetlistBootcampResponse = {
          id: response.id,
          name: response.name,
          bootcampStateName: response.bootcampStateName,
          bootcampStateId: response.bootcampStateId,
          startDate: response.startDate,
          endDate: response.endDate,
          instructorFirstName: response.instructorFirstName,
          instructorLastName: response.instructorLastName,
        };
        return newResponse;
      })
    )
    ;
  }
  override updateBootcamp(bootcamp: UpdateBootcampRequest): Observable<UpdateBootcampesponse> {
    return this.httpClient.put<UpdateBootcampesponse>(`${this.apiUrl}`, bootcamp);
  }

  override postBootcamp(bootcamp: CreateBootcampRequest): Observable<CreateBootcampResponse> {
    return this.httpClient.post<CreateBootcampResponse>(this.apiUrl, bootcamp);
  }
  override deleteBootcamp(id: number): Observable<DeleteBootcampResponse> {
    return this.httpClient.delete<DeleteBootcampResponse>( `${this.apiUrl}/`+ id);
  }
}
