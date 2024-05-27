import { Component, OnInit } from '@angular/core';
import { AdminbootcampComponent } from '../adminbootcamp/adminbootcamp/adminbootcamp.component';
import { AdmininstructorsComponent } from '../admininstructors/admininstructors/admininstructors.component';
import { AdminpanelComponent } from '../../adminpanel/adminpanel.component';
import { Router, RouterModule,NavigationStart } from '@angular/router';
import { AdminModule } from '../admin.module';
import { CommonModule } from '@angular/common';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule, MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminModule, AdminbootcampComponent, AdmininstructorsComponent, AdminpanelComponent,MdbCollapseModule,CommonModule,MdbDropdownModule,MdbRippleModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  currentRoute: string = '';
  isLoggedIn!: boolean;
  isAdmin!: boolean;
  menuItems!: [];
  userLogged!: boolean;
  showLogoutModal = false;
  userId!: string;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: MdbModalService
  ) { }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      // modalClass: 'modal-dialog-centered'
    })
  }

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }

  ngOnInit(): void {
    this.getMenuItems();
    console.log(this.getUserName());
    console.log(this.getUserId())
    console.log(this.authService.getRoles())
    this.getUserId();
    this.router.events
      .pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        this.currentRoute = event.url;
      });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['homepage'])
  }

  setUserLogged(): boolean {
    return this.userLogged = this.authService.loggedIn()
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  getUserId(): string {
    this.userId = this.authService.getCurrentUserId();
    return this.authService.getCurrentUserId();
  }
  async getMenuItems() {
    const isUserLoggedIn = await this.authService.loggedIn();
    if (isUserLoggedIn) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    if (this.authService.isAdmin()) {

      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }


  showSearchInput: boolean = false;
  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
    if (this.showSearchInput) {
      setTimeout(() => {
        const inputElement = document.getElementById('searchInput');
        if (inputElement) {
          inputElement.focus();
        }
      });
    }
  }

  currentSection: string = 'adminpanel';
  showSection(section: string) {
    if (section = 'adminpanel') {
      console.log(this.currentSection)
        this.currentSection = 'bootcamps';
    }
  }
}
