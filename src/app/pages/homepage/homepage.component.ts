import { Component, HostListener ,EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { InstructorListItem } from '../../features/models/responses/instructor/instructorItemDto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
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
  bootcamps: BootcampListItem = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };

  constructor(private bootcampService: BootcampService) {}
  readonly PAGE_SIZE = 8;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
   }
   displayIntro: boolean = false;

   @HostListener('window:scroll', [])
   onScroll(): void {
     this.scrollFunction();
   }
   scrollFunction(): void {
    if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && !this.TopOfPage()) {
        this.displayIntro = true;
    } else {
        this.displayIntro = false;
    }
}
TopOfPage(): boolean {
    return window.scrollY === 0;
}
ngAfterViewInit() {
  // Carousel'in başlatılması
  $('#introCarousel').carousel();
}

prevSlide() {
  $('#introCarousel').carousel('prev');
}

nextSlide() {
  $('#introCarousel').carousel('next');
}

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
    });
  }

  isOpen: { [key: string]: boolean } = {};

  toggleCardBody(id: number) {
    this.isOpen[id.toString()] = !this.isOpen[id.toString()];
  }

}
