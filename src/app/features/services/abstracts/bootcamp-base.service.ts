import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { PageRequest } from "../../../core/models/requests/PageRequest";
import { BootcampListItem } from "../../models/responses/bootcamp/bootcampItemDto";


@Injectable({
  providedIn: 'root',
})
export abstract class BootcampBaseService {
  constructor() {}
  abstract getList(pageRequest: PageRequest): Observable<BootcampListItem>;
}
