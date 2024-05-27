import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../features/services/concretes/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }
}