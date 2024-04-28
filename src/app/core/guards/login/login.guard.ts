import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = 
(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const toastrService = inject(ToastrService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn()) {
    return true;
  }
  else{
    router.navigate(['/register']);
    toastrService.error("Giriş Yapmalısınız");
    return false;
  }
};
