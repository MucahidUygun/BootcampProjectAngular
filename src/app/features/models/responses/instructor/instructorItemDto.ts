import { PageResponse } from "../../../../core/models/Responses/PageResponse";
import { GetlistInstructorResponse } from "./getlist-instructor-response";

;

export interface InstructorListItem extends PageResponse {
  items: GetlistInstructorResponse[];
}