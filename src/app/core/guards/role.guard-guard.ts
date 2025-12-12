import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard = (requiredPermission: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isAuthenticated()) {
      router.navigate(['/auth/login']);
      return false;
    }
    if (!auth.hasPermission(requiredPermission)) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
};
