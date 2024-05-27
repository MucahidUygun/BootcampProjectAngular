import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from '../adminpanel/adminpanel.component';
import { AdminbootcampComponent } from './adminbootcamp/adminbootcamp/adminbootcamp.component';
import { AdmininstructorsComponent } from './admininstructors/admininstructors/admininstructors.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
  CommonModule,
  RouterModule,
  AdminpanelComponent,
  AdminbootcampComponent,
  AdmininstructorsComponent,
  AdminLayoutComponent
  ]
})
export class AdminModule { }
