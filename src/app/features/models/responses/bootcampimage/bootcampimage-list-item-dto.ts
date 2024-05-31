
import { PageResponse } from "../../../../core/models/page-response-model";
import { GetlistBootcampimageResponse } from "./getlist-bootcampimage-response";

export interface BootcampimageListItemDto extends PageResponse {
    items:GetlistBootcampimageResponse[];
}