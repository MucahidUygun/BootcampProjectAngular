import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,NavigationStart  } from '@angular/router';
import { MdbDropdownModule, MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { AdminpanelComponent } from '../../../pages/adminpanel/adminpanel.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MdbDropdownModule,MdbRippleModule,CommonModule,MdbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  currentRoute: string = '';
  isLoggedIn!: boolean; 
  isAdmin!: boolean; 
  menuItems!:[];
  userLogged!:boolean;
  showLogoutModal = false;
  userId!:string;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private authService:AuthService,
    private router:Router,
    private modalService: MdbModalService
  ){}
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
   sidebarOpen: boolean = false;
   toggleSidebar() {
     this.sidebarOpen = !this.sidebarOpen;
     if (this.sidebarOpen) {
      document.querySelector('.sidebar')?.classList.add('open');
      this.sidebarOpen = !this.sidebarOpen;
     } else {
      document.querySelector('.sidebar')?.classList.remove('open');
     }
   }

   logOut(){
    this.authService.logOut();
    this.router.navigate(['homepage'])
   }
   
   setUserLogged() :boolean{
    return this.userLogged=this.authService.loggedIn()
   }

   getUserName():string{
    return this.authService.getUserName();
   }

   getUserId():string{
    this.userId = this.authService.getCurrentUserId();
    return this.authService.getCurrentUserId();
   }
  async getMenuItems(){
    const isUserLoggedIn = await this.authService.loggedIn();
    if(isUserLoggedIn){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
    if(this.authService.isAdmin()){

        this.isAdmin = true;
    }
    else{
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
  }