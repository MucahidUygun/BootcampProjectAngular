import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from '@coreui/angular';
import { AuthService } from './features/services/concretes/auth.service';
import { TestComponent } from './pages/test/test.component';
import { InstructorComponent } from './pages/instructor/instructor.component';


export const routes: Routes = [
    {path:'',redirectTo:'homepage',pathMatch:'full'},
    {path:'homepage',component:HomepageComponent},
    {path:'login' ,component:LoginComponent},
    {path:'' ,component:NavbarComponent, canActivate:[AuthService]},
    {path:'test',component:TestComponent},
    {path: 'instructors', component:InstructorComponent},

];
