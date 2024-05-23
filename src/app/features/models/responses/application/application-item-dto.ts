import { PageResponse } from "../../../../core/models/page-response-model";
import { PageRequest } from "../../../../core/models/requests/PageRequest";
import { GetlistApplicationResponse } from "./getlist-application-response";

export interface ApplicationItemDto extends PageResponse{
    items: GetlistApplicationResponse[];
}