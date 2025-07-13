import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../interfaces';

/**
 * Admin Guard
 * Follows Single Responsibility Principle - handles only admin route protection
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user && (user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR)) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}