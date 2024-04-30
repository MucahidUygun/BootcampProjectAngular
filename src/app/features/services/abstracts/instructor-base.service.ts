import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';
import { InstructorListItem } from '../../models/responses/instructor/instructorItemDto';

@Injectable({
  providedIn: 'root'
})
export abstract class InstructorBaseService {

  constructor() { }
  abstract getList(pageRequest: PageRequest): Observable<InstructorListItem>;
}
