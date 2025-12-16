import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
declare let alertify: any;

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    alertify.error('authGuard, No autenticado - redirigiendo al login');
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
