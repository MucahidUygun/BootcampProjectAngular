export interface GetlistBootcampResponse {
  id: number;
  name: string;
  instructorId:string;
  bootcampStateName: string;
  bootcampStateId: number;
  startDate: Date;
  endDate: Date;
  instructorFirstName: string;
  instructorLastName: string;
  imagePath: string;
}
