import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistBootcampResponse } from '../../../features/models/responses/bootcamp/getlist-bootcamp-response';
import { GetlistBootcampstateResponse } from '../../../features/models/responses/bootcampstate/getlist-bootcampstate-response';
import { DataResult } from '../../../features/models/DataResult';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../../core/models/requests/PageRequest';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  bootcamps: BootcampListItem = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };
  
  private readonly apiUrl: string = `${environment.API_URL}/bootcamps`; //?PageIndex=0&PageSize=10
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private authService:AuthService,
    private router:Router,
    private modalService: MdbModalService,
    private httpClient: HttpClient,
    private bootcampService: BootcampService
  ){}
  readonly PAGE_SIZE = 3;
  logOut(){
    this.authService.logOut();
    this.router.navigate(['login'])
   }
   ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
    });
}}
