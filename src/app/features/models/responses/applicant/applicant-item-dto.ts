import { PageResponse } from "../../../../core/models/page-response-model";
import { GetlistApplicantResponse } from "./getlist-applicant-response";

export interface ApplicantItemDto extends PageResponse{
    items:GetlistApplicantResponse[]
}