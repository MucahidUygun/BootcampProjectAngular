import { PageResponse } from "../../../../core/models/page-response-model";
import { PageRequest } from "../../../../core/models/requests/PageRequest";
import { GetlistBootcampstateResponse } from "./getlist-bootcampstate-response";

export interface BootcampStateListItem extends PageResponse{
    items:GetlistBootcampstateResponse[];
}