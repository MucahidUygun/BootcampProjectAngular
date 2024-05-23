import { Component, OnInit } from '@angular/core';
import { BootcampListItem } from '../../models/responses/bootcamp/bootcampItemDto';
import { BootcampService } from '../../services/concretes/bootcamp.service';
import { Router } from '@angular/router';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcamp-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootcamp-card.component.html',
  styleUrl: './bootcamp-card.component.scss',
})
export class BootcampCardComponent implements OnInit {
  bootcamps: BootcampListItem = {
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
    private router: Router
  ) {}
  readonly PAGE_SIZE = 4;
  currentPageNumber: number = 1;

  viewDetails(bootcampId: number): void {
    this.router.navigate(['/bootcamp-detail', bootcampId]);
  }

  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  }

  getBootcamps(pageRequest: PageRequest): void {
    this.bootcampService.getList(pageRequest).subscribe(
      (response) => {
        console.log('Bootcamps fetched:', response);
        this.bootcamps = response;
        this.updateCurrentPageNumber();
      },
      (error) => {
        console.error('Failed to fetch bootcamps:', error);
      }
    );
  }

  nextOnClick(): void {
    if (this.bootcamps.hasNext) {
      const nextPageIndex = this.bootcamps.index + 1;

      this.getBootcamps({ page: nextPageIndex, pageSize: this.PAGE_SIZE });
    }
  }

  previousOnClick(): void {
    if (this.bootcamps.hasPrevious) {
      const previousPageIndex = this.bootcamps.index - 1;

      this.getBootcamps({ page: previousPageIndex, pageSize: this.PAGE_SIZE });
    }
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcamps.index + 1;
  }

  goToPage(page: number): void {
    this.getBootcamps({ page: page - 1, pageSize: this.PAGE_SIZE });
  }

  totalPages(): number[] {
    const total = Math.ceil(this.bootcamps.count / this.PAGE_SIZE);
    return Array.from({ length: total }, (_, index) => index + 1);
  }
}
