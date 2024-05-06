import { Component } from '@angular/core';
import { AuthService } from '../../features/services/concretes/auth.service';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcampItemDto';
import { PageRequest } from '../../core/models/requests/PageRequest';
import { InstructorListItem } from '../../features/models/responses/instructor/instructorItemDto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [NavbarComponent,MdbDropdownModule,MdbRippleModule,CommonModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {
  claims: string[] = []
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

  constructor(private bootcampService: BootcampService,private instructorService: InstructorService,private authservice: AuthService) {}
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
    this.getInstructors({ page: 0, pageSize: this.PAGE_SIZE });
  }

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
    });
  }
    getInstructors(pageRequest: PageRequest) {
      this.instructorService.getList(pageRequest).subscribe((response) => {
        this.instructors = response;
      });
  }
  isAdmin() {
    if (this.claims.includes("admin" && "Admin")) {
      return true;
    }
    else {
      return false;
    }
  }
}
