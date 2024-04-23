import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp-pipe.pipe";


@NgModule({
    declarations:[FilterBootcampPipe],
    exports:[FilterBootcampPipe],
    imports:[CommonModule]

})
export class SharedModule{}