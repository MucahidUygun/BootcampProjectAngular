import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { GetlistApplicantResponse } from '../../../features/models/responses/applicant/getlist-applicant-response';
import { GetlistBlacklistResponse } from '../../../features/models/responses/blacklist/getlist-blacklist-response';
import { CreateBlacklistRequest } from '../../../features/models/requests/blacklist/create-blacklist-request';
import { BlacklistService } from '../../../features/services/concretes/blacklist.service';
import { ApplicantService } from '../../../features/services/concretes/applicant.service';
import { NotificationsService } from '../../../features/services/concretes/notification-service';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { UpdateBlacklistRequest } from '../../../features/models/requests/blacklist/update-blacklistre-quest';
import { formatDateString } from '../../../core/helpers/form-date';

@Component({
  selector: 'app-blacklist',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './blacklist.component.html',
  styleUrl: './blacklist.component.scss'
})
export class BlacklistComponent {
  applicants!: GetlistApplicantResponse[]
  blacklists!: GetlistBlacklistResponse[]
  createdBlackList:CreateBlacklistRequest={
    applicantId: '',
    reason: '',
    date: new Date('dd/MM/yyyy')
  }
  defaultMessage: string = 'Lütfen Bir Değer Seçiniz'
  constructor(
    private blacklistService:BlacklistService,
    private applicantService:ApplicantService,
    private toastrMessage:NotificationsService,
    private datePipe:DatePipe
  ){}

    ngOnInit(){
      this.setApplicantsArrayFunc();
      this.setBlacklistsArrayFunc({ page: 0, pageSize: 100 });
    }

    convertDate(date: Date) {
      return formatDateString(date);
    }

    onOptionsChange(item: any, newValue: any) {
      item.value = newValue
    }

    setApplicantsArrayFunc(){
      this.applicantService.getListApplicant({ page: 0, pageSize: 100 }).subscribe(
        (response) => {
          this.applicants = response.items;
        }
      )
    }

    setBlacklistsArrayFunc(pageRequest:PageRequest){
      this.blacklistService.getList(pageRequest).subscribe(
        (response)=>{
          this.blacklists=response.items;
        }
      )
    }

    updateBlacklistFunc(updateBlacklist:UpdateBlacklistRequest){
      console.log(this.blacklists)
      this.blacklistService.updateBlacklist(updateBlacklist).subscribe(
        {
          next: () => {
            console.log(updateBlacklist)
            this.toastrMessage.showSuccess("Güncelleme İşlemi Başarılı");
            this.setBlacklistsArrayFunc({ page: 0, pageSize: 100 });
          },
          error: () => {
            this.toastrMessage.showError("Başarısız");
          }
        }
      )
    }

    clearBlackListFunc(){
      this.createdBlackList={
        applicantId: '',
        reason: '',
        date: new Date()
      }
    }

    deleteBlacklistFunc(id:number){
      this.blacklistService.deleteBlacklist(id).subscribe(
        {
          next: () => {
            this.toastrMessage.showSuccess("Silme İşlemi başarılı");
            this.setBlacklistsArrayFunc({ page: 0, pageSize: 100 });
          },
          error: () => {
            this.toastrMessage.showError("Silinemedi");
          }
        }
      )
    }

    postBlacklistFunc(){
      console.log(this.createdBlackList)
      this.blacklistService.postBlacklist(this.createdBlackList).subscribe(
        {
          next: () => {
            this.toastrMessage.showSuccess("Üye karalisteye eklendi!!! ");
            this.setBlacklistsArrayFunc({ page: 0, pageSize: 100 });
          },
          error: () => {
            this.toastrMessage.showError("Error");
          }
        }
      )
    }
}
