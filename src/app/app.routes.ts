import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from '@coreui/angular';
import { AuthService } from './features/services/concretes/auth.service';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { BootcampsComponent } from './pages/bootcamps/bootcamps.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { AdminbootcampComponent } from './pages/layouts/adminbootcamp/adminbootcamp/adminbootcamp.component';
import { AdmininstructorsComponent } from './pages/layouts/admininstructors/admininstructors/admininstructors.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { BootcampCardComponent } from './features/components/bootcamp-card/bootcamp-card.component';
import { BootcampDetailComponent } from './features/components/bootcamp-detail/bootcamp-detail.component';
import { ApplicationComponent } from './pages/adminpanel/application/application.component';
import { BlacklistComponent } from './pages/adminpanel/blacklist/blacklist.component';
import { ApplicationStateComponent } from './pages/adminpanel/application-state/application-state.component';


export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'bootcampcards', component: BootcampCardComponent },
    { path: 'bootcamp-detail/:bootcampId', component: BootcampDetailComponent },
    { path: 'adminpanel', component: AdminLayoutComponent,
        children: [
            { path: '', component: AdminpanelComponent},
            { path: 'adminbootcamps', component: AdminbootcampComponent },
            { path: 'admininstructors', component: AdmininstructorsComponent},
            { path: 'application', component: ApplicationComponent},
            { path: 'blacklist', component: BlacklistComponent},
            { path: 'applicationstate', component: ApplicationStateComponent},
        ]
    },
    { path: '', component: NavbarComponent, canActivate: [AuthService] },
    { path: 'bootcamps', component: BootcampsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'notifications', component: NotificationsComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }