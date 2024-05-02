import { Component } from '@angular/core';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: MdbModalService,
    public modalRef: MdbModalRef<ModalComponent>
  ) { }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['login'])
  }
  close(): void {
    this.modalRef.close()
  }
}

