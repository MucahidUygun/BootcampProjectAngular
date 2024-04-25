import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistBootcampResponse } from '../../features/models/responses/bootcamp/getlist-bootcamp-response';
import { GetlistBootcampstateResponse } from '../../features/models/responses/bootcampstate/getlist-bootcampstate-response';
import { DataResult } from '../../features/models/DataResult';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BootcampCardComponent } from '../../features/components/bootcamp-card/bootcamp-card.component';
import { environment } from '../../../environments/environment.development';

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
  private readonly apiUrl: string = `${environment.API_URL}/Bootcamps?PageIndex=0&PageSize=10`;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getListModels();
  }

  getListModels() {
    this.httpClient
      .get<DataResult<GetlistBootcampResponse[]>>(this.apiUrl)
      .subscribe({
        next: (response: DataResult<GetlistBootcampResponse[]>) => {
          console.log('Cevap geldi :', response);
          this.bootcampList = response.items;
          console.log(response.index);
          console.log(response.size);
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
