import { PageResponse } from "../../../../core/models/Responses/PageResponse";
import { GetlistBootcampResponse } from "./GetListBootcampResponse";

;

export interface BootcampListItem extends PageResponse {
  items: GetlistBootcampResponse[];
}