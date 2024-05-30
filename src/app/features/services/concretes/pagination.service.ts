import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/PageRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  readonly PAGE_SIZE = 1;

  currentPageNumber: number = 1;

  constructor() {}

  paginate(
    fetchFunction: (pageRequest: PageRequest) => Observable<any>,
    pageRequest: PageRequest,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ): void {
    fetchFunction(pageRequest).subscribe(
      (response) => {
        console.log('Data fetched:', response);
        onSuccess(response);
        this.updateCurrentPageNumber(response.index);
      },
      (error) => {
        console.error('Failed to fetch data:', error);
        onError(error);
      }
    );
  }

  next(
    fetchFunction: (pageRequest: PageRequest) => Observable<any>,
    currentIndex: number,
    hasNext: boolean,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ): void {
    if (hasNext) {
      const nextPageIndex = currentIndex + 1;
      this.paginate(
        fetchFunction,
        { page: nextPageIndex, pageSize: this.PAGE_SIZE },
        onSuccess,
        onError
      );
    }
  }

  previous(
    fetchFunction: (pageRequest: PageRequest) => Observable<any>,
    currentIndex: number,
    hasPrevious: boolean,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ): void {
    if (hasPrevious) {
      const previousPageIndex = currentIndex - 1;
      this.paginate(
        fetchFunction,
        { page: previousPageIndex, pageSize: this.PAGE_SIZE },
        onSuccess,
        onError
      );
    }
  }

  goToPage(
    fetchFunction: (pageRequest: PageRequest) => Observable<any>,
    page: number,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ): void {
    this.paginate(
      fetchFunction,
      { page: page - 1, pageSize: this.PAGE_SIZE },
      onSuccess,
      onError
    );
  }

  updateCurrentPageNumber(index: number): void {
    this.currentPageNumber = index + 1;
  }

  totalPages(count: number): number[] {
    const total = Math.ceil(count / this.PAGE_SIZE);
    return Array.from({ length: total }, (_, index) => index + 1);
  }
}
