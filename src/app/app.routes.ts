import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from '@coreui/angular';
import { AuthService } from './features/services/concretes/auth.service';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
<<<<<<< HEAD
import { ProfileComponent } from './pages/profile/profile.component';
=======
>>>>>>> 6b1aad005f0297ed37ddc8f7d04e2f6d7fe6fde6

export const routes: Routes = [
    {path:'',redirectTo:'homepage',pathMatch:'full'},
    {path:'homepage',component:HomepageComponent},
    {path:'login' ,component:LoginComponent},
    {path:'adminpanel' ,component:AdminpanelComponent},
<<<<<<< HEAD
    {path:'profil' ,component:ProfileComponent},
=======
>>>>>>> 6b1aad005f0297ed37ddc8f7d04e2f6d7fe6fde6
    {path:'' ,component:NavbarComponent, canActivate:[AuthService]}
];