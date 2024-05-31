import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';


declare var $: any;

@Component({
  selector: 'app-homepage',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FormsModule,
    MdbCarouselModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
    
   }

}
