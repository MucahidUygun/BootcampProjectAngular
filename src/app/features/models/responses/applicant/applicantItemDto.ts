import { PageResponse } from "../../../../core/models/Responses/PageResponse";
import { GetlistApplicantResponse } from "./getlist-applicant-response";

;

export interface ApplicantListItem extends PageResponse {
  items: GetlistApplicantResponse[];
}