import {
  Component,
  HostListener,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { InstructorListItem } from '../../features/models/responses/instructor/instructorItemDto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { BootcampCardComponent } from '../../features/components/bootcamp-card/bootcamp-card.component';

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
    BootcampCardComponent,
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
  instructors: InstructorListItem = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };

  constructor(
    private bootcampService: BootcampService,
    private instructorService: InstructorService,
    private router: Router
  ) {}
  readonly PAGE_SIZE = 4;
  ngOnInit(): void {
    this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
  }
  displayIntro: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrollFunction();
  }
  scrollFunction(): void {
    if (
      (document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20) &&
      !this.TopOfPage()
    ) {
      this.displayIntro = true;
    } else {
      this.displayIntro = false;
    }
  }
  TopOfPage(): boolean {
    return window.scrollY === 0;
  }

  getInstructors(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructors = response;
    });
  }
}
