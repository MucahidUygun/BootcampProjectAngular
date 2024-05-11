import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { PageRequest } from "../../../core/models/requests/PageRequest";
import { BootcampListItem } from "../../models/responses/bootcamp/bootcampItemDto";
import { CreateBootcampRequest } from "../../models/requests/bootcamp/create-bootcamp-request";
import { DeleteBootcampResponse } from "../../models/responses/bootcamp/delete-bootcamp-response";
import { UpdateBootcampRequest } from "../../models/requests/bootcamp/update-bootcamp-request";
import { CreateBootcampResponse } from "../../models/responses/bootcamp/create-bootcamp-response";
import { UpdateBootcampesponse } from "../../models/responses/bootcamp/update-bootcamp-response";
import { GetlistBootcampResponse } from "../../models/responses/bootcamp/getlist-bootcamp-response";


@Injectable({
  providedIn: 'root',
})
export abstract class BootcampBaseService {
  constructor() {}
  abstract getList(pageRequest: PageRequest): Observable<BootcampListItem>;
  abstract postBootcamp(bootcamp:CreateBootcampRequest): Observable<CreateBootcampResponse>;

  abstract deleteBootcamp(id:number):Observable<DeleteBootcampResponse>;
  abstract updateBootcamp(bootcamp:UpdateBootcampRequest): Observable<UpdateBootcampesponse>;
  abstract getBootcamp(id:number):Observable<GetlistBootcampResponse>; 
}
