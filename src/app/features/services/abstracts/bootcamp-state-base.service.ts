import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';
import { GetbyidBootcampstateResponse } from '../../models/responses/bootcampstate/getbyid-bootcampstate-response';
import { CreateBootcampstateResponse } from '../../models/responses/bootcampstate/create-bootcampstate-resonse';
import { CreateBootcampstateRequest } from '../../models/requests/bootcampstate/create-bootcampstate-request';
import { DeleteBootcampstateResponse } from '../../models/responses/bootcampstate/delete-bootcampstate-response';
import { UpdateBootcampstateResponse } from '../../models/responses/bootcampstate/update-bootcampstate-response';
import { BootcampStateListItem } from '../../models/responses/bootcampstate/bootcampState-List-Item';

@Injectable({
  providedIn: 'root'
})
export abstract class BootcampStateBaseService {

  constructor() { }


  
  abstract getListBootcampState(pageRequest: PageRequest): Observable<BootcampStateListItem>; 

  abstract getByIdBootcmapState(id:number): Observable<GetbyidBootcampstateResponse>;

  abstract addBootcampState(bootcampState:CreateBootcampstateRequest): Observable<CreateBootcampstateResponse>;

  abstract deleteBootcampState(id:number): Observable<DeleteBootcampstateResponse>;

  abstract updateBootcampState(bootcampState:CreateBootcampstateRequest): Observable<UpdateBootcampstateResponse>;



}
