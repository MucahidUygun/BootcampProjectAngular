import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { ApplicationStateItemDto } from '../../models/responses/applicationstate/application-state-item-dto';
import { Observable } from 'rxjs';
import { CreateApplicationstateResponse } from '../../models/responses/applicationstate/create-applicationstate-response';
import { CreateApplicationstateRequest } from '../../models/requests/applicationstate/create-applicationstate-request';
import { DeleteApplicationstateResponse } from '../../models/responses/applicationstate/delete-applicationstate-response';
import { UpdateApplicationstateRequest } from '../../models/requests/applicationstate/update-applicationstate-request';
import { UpdateApplicationstateResponse } from '../../models/responses/applicationstate/update-applicationstate-response';
import { GetbyidApplicationstateResponse } from '../../models/responses/applicationstate/getbyid-applicationstate-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicationStateBaseService {

  constructor() { }

  abstract getList(pageRequest:PageRequest):Observable<ApplicationStateItemDto>;
  abstract postApplicationState(applicationState:CreateApplicationstateRequest):Observable<CreateApplicationstateResponse>;
  abstract deleteApplicationState(id:number):Observable<DeleteApplicationstateResponse>;
  abstract updateApplicationState(applicationState:UpdateApplicationstateRequest):Observable<UpdateApplicationstateResponse>;
  abstract getByIdApplicationState(id:number):Observable<GetbyidApplicationstateResponse>;
}
