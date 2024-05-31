import { Component, HostListener ,EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule, Router,RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { BootcampimageListItemDto } from '../../features/models/responses/bootcampimage/bootcampimage-list-item-dto';

@Component({
  selector: 'app-bootcamps',
  standalone: true,
  imports: [    
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FormsModule,
    MdbCarouselModule,
  MdbFormsModule],
  templateUrl: './bootcamps.component.html',
  styleUrl: './bootcamps.component.scss'
})
export class BootcampsComponent {
  bootcamps: BootcampListItem = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };
  bootcampImageList: BootcampimageListItemDto;
  constructor(private bootcampService: BootcampService,private router: Router) {}
  readonly PAGE_SIZE = 4;
  currentPageNumber = 1;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
    this.updateCurrentPageNumber();
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

  getBootcamps(pageRequest: PageRequest): void {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
      this.updateCurrentPageNumber();
    });
  }
  isOpen: { [key: string]: boolean } = {};

  toggleCardBody(id: number, event: Event): void {
    if ((event.target as HTMLElement).tagName !== 'BUTTON') {
      this.isOpen[id] = !this.isOpen[id];
    }
  }
  
  viewDetails(bootcampId: number): void {
    this.router.navigate(['/bootcamp-detail', bootcampId]);
  }
  nextOnClick(): void {
    if (this.bootcamps.hasNext) {
      this.loadBootcamps(this.currentPageNumber + 1);
    }
  }
  loadBootcamps(page: number): void {
    this.getBootcamps({ page: page - 1, pageSize: this.PAGE_SIZE });
  }
  previousOnClick(): void {
    if (this.bootcamps.hasPrevious) {
      this.loadBootcamps(this.currentPageNumber - 1);
    }
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcamps.index + 1;
  }

  goToPage(page: number): void {
    this.loadBootcamps(page);
  }

  totalPages(): number[] {
    const total = Math.ceil(this.bootcamps.count / this.PAGE_SIZE);
    return Array.from({ length: total }, (_, index) => index + 1);
  }
}
