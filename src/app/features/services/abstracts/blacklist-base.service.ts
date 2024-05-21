import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';
import { BlacklistItemDto } from '../../models/responses/blacklist/blacklist-item-dto';
import { CreateBlacklistResponse } from '../../models/responses/blacklist/create-blacklist-response';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { DeleteBlacklistResponse } from '../../models/responses/blacklist/delete-blacklist-response';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklistre-quest';
import { UpdateBlacklistResponse } from '../../models/responses/blacklist/update-blacklist-response';
import { GetbyidBlacklistResponse } from '../../models/responses/blacklist/getbyid-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BlacklistBaseService {

  constructor() { }

  abstract getList(pageRequest:PageRequest):Observable<BlacklistItemDto>;
  abstract postBlacklist(blacklist:CreateBlacklistRequest):Observable<CreateBlacklistResponse>;
  abstract deleteBlacklist(id:number):Observable<DeleteBlacklistResponse>;
  abstract updateBlacklist(blacklist:UpdateBlacklistRequest):Observable<UpdateBlacklistResponse>;
  abstract getByIdBlacklist(id:number):Observable<GetbyidBlacklistResponse>;

}
