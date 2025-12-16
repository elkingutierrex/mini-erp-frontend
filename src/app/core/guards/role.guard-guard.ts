import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
declare let alertify: any;

export const roleGuard = (requiredPermission: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isAuthenticated()) {
      router.navigate(['/auth/login']);
      alertify.error('roleGuard, No autenticado - redirigiendo al login');
      return false;
    }
    if (!auth.hasPermission(requiredPermission)) {
      alertify.error(`roleGuard --- No tiene permiso:', ${requiredPermission}`);
      router.navigate(['/']);
      return false;
    }
    return true;
  };
};
