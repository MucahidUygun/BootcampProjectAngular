export interface UpdateBootcampRequest {
    id:number;
    name:string;
    instructorId:string;
    bootcampStateId:number;
    startDate:Date;
    endDate:Date;
}
