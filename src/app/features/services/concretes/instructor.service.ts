import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroment";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PageRequest } from "../../../core/models/requests/PageRequest";
import { InstructorBaseService } from "../abstracts/instructor-base.service";
import { InstructorListItem } from "../../models/responses/instructor/instructorItemDto";


@Injectable({
  providedIn: 'root',
})
export class InstructorService extends InstructorBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

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
}
