import { PageResponse } from "../../../../core/models/page-response-model";
import { GetlistApplicationstateResponse } from "./getlist-applicationstate-response";

export interface ApplicationStateItemDto extends PageResponse {
    items: GetlistApplicationstateResponse[];
  }