import { PageResponse } from "../../../../core/models/page-response-model";
import { GetlistBlacklistResponse } from "./getlist-blacklist-response";

export interface BlacklistItemDto extends PageResponse{
    items:GetlistBlacklistResponse[]
}