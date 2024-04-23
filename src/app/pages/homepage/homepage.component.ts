import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { DataResult } from '../../models/DataResult';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  bootcampList: GetlistBootcampResponse[] = [];
  bootcampState: GetlistBootcampstateResponse[] = [];

  constructor(private httpClient: HttpClient) {}
  erenPortNumber: number = 5278;

  ngOnInit(): void {
    this.getListModels();
  }
  getListModels() {
    this.httpClient
      .get<DataResult<GetlistBootcampResponse[]>>(
        'http://localhost:5278/api/Bootcamps?PageIndex=0&PageSize=10'
      )
      .subscribe({
        next: (response: DataResult<GetlistBootcampResponse[]>) => {
          console.log('Cevap geldi :', response);
          this.bootcampList = response.items;
        },
        error: (error) => {
          console.log('cevap hatalı :', error);
        },
        complete: () => {
          console.log('istek sonlandı');
        },
      });
  }
}
