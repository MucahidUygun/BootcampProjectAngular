import { Component, OnInit } from '@angular/core';
import { BootcampListItem } from '../../models/responses/bootcamp/bootcampItemDto';
import { BootcampService } from '../../services/concretes/bootcamp.service';
import { Router, RouterModule } from '@angular/router';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../services/concretes/pagination.service';

@Component({
  selector: 'app-bootcamp-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    private paginationService: PaginationService,
    private router: Router
  ) {}

  currentPageNumber: number = 1;

  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.paginationService.PAGE_SIZE });
  }

  viewDetails(bootcampId: number): void {
    this.router.navigate(['/bootcamp-detail', bootcampId]);
  }

  // getBootcamps(pageRequest: PageRequest): void {
  //   this.bootcampService.getList(pageRequest).subscribe(
  //     (response) => {
  //       console.log('Bootcamps fetched:', response);
  //       this.bootcamps = response;
  //       this.updateCurrentPageNumber();
  //     },
  //     (error) => {
  //       console.error('Failed to fetch bootcamps:', error);
  //     }
  //   );
  // }

  getBootcamps(pageRequest: PageRequest): void {
    this.paginationService.paginate(
      (request) => this.bootcampService.getList(request),
      pageRequest,
      (response) => (this.bootcamps = response),
      (error) => console.error('Bootcamps yuklenemedi: ', error)
    );
  }

  nextOnClick(): void {
    this.paginationService.next(
      (request) => this.bootcampService.getList(request),
      this.bootcamps.index,
      this.bootcamps.hasNext,
      (response) => (this.bootcamps = response),
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  previousOnClick(): void {
    this.paginationService.previous(
      (request) => this.bootcampService.getList(request),
      this.bootcamps.index,
      this.bootcamps.hasPrevious,
      (response) => (this.bootcamps = response),
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  goToPage(page: number): void {
    this.paginationService.goToPage(
      (request) => this.bootcampService.getList(request),
      page,
      (response) => (this.bootcamps = response),
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  totalPages(): number[] {
    return this.paginationService.totalPages(this.bootcamps.count);
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcamps.index + 1;
  }
}
