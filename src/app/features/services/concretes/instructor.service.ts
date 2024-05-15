import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroment";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PageRequest } from "../../../core/models/requests/PageRequest";
import { InstructorBaseService } from "../abstracts/instructor-base.service";
import { InstructorListItem } from "../../models/responses/instructor/instructorItemDto";
import { CreateInstructorRequest } from "../../models/requests/instructor/create-instructor-request";
import { CreateInstructorResponse } from "../../models/responses/instructor/create-instructor-response";
import { DeleteInstructorResponse } from "../../models/responses/instructor/delete-instructor-response";
import { UpdateInstructorRequest } from "../../models/requests/instructor/update-instructor-request";
import { UpdateInstructorResponse } from "../../models/responses/instructor/update-instructor-response";
import { GetlistInstructorResponse } from "../../models/responses/instructor/getlist-instructor-response";


@Injectable({
  providedIn: 'root',
})
export class InstructorService extends InstructorBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }
  readonly apiUrlRegister: string = `${environment.API_URL}/Auth/RegisterInstructor`;
  private readonly apiUrl: string = `${environment.API_URL}/instructors`;

  override getList(
    pageRequest: PageRequest
  ): Observable<InstructorListItem> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };

    return this.httpClient
      .get<InstructorListItem>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: InstructorListItem = {
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
  override getInstructor(id: number): Observable<GetlistInstructorResponse> {
    return this.httpClient.get<GetlistInstructorResponse>(`${this.apiUrl}/` + id)
    .pipe(
      map((response) => {
        const newResponse: GetlistInstructorResponse = {
          id: response.id, 
          userName: response.userName,
          firstName:response.firstName,
          lastName:response.lastName,
          companyName:response.companyName,
          dateOfBirth: response.dateOfBirth,
          nationalIdentity:response.nationalIdentity,
          email:response.email,
          password:response.password,
          updatedDate:response.updatedDate,
        };
        return newResponse;
      })
    )
    ;
  }
  override postInstructor(instructor: CreateInstructorRequest): Observable<CreateInstructorResponse> {
    return this.httpClient.post<CreateInstructorResponse>(this.apiUrlRegister, instructor);
  }
  override deleteInstructor(id: Number): Observable<DeleteInstructorResponse> {
    return this.httpClient.delete<DeleteInstructorResponse>( `${this.apiUrl}/`+ id);
  }
  override updateInstructor(instructor: UpdateInstructorRequest): Observable<UpdateInstructorResponse> {
    return this.httpClient.put<UpdateInstructorResponse>(`${this.apiUrl}`, instructor);
  }
}
