import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';
import { InstructorListItem } from '../../models/responses/instructor/instructorItemDto';
import { CreateInstructorRequest } from '../../models/requests/instructor/create-instructor-request';
import { CreateInstructorResponse } from '../../models/responses/instructor/create-instructor-response';
import { DeleteInstructorResponse } from '../../models/responses/instructor/delete-instructor-response';
import { UpdateInstructorResponse } from '../../models/responses/instructor/update-instructor-response';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { GetlistInstructorResponse } from '../../models/responses/instructor/getlist-instructor-response';

@Injectable({
  providedIn: 'root'
})
export abstract class InstructorBaseService {

  constructor() { }
  abstract getList(pageRequest: PageRequest): Observable<InstructorListItem>;
  abstract postInstructor(instructor:CreateInstructorRequest): Observable<CreateInstructorResponse>;
  abstract deleteInstructor(id:number):Observable<DeleteInstructorResponse>;
  abstract updateInstructor(instructor:UpdateInstructorRequest): Observable<UpdateInstructorResponse>;
  abstract getInstructor(id:number):Observable<GetlistInstructorResponse>; 
}
