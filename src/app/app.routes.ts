import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from '@coreui/angular';
import { AuthService } from './features/services/concretes/auth.service';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path:'',redirectTo:'homepage',pathMatch:'full'},
    {path:'homepage',component:HomepageComponent},
    {path:'login' ,component:LoginComponent},
    {path:'adminpanel' ,component:AdminpanelComponent},
    {path:'profil' ,component:ProfileComponent},
    {path:'' ,component:NavbarComponent, canActivate:[AuthService]}
];