import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Home } from './pages/home/home';

/**
 * Main application routes
 * Follows Open/Closed Principle - easily extensible for new routes
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Home - NINAMovie'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule),
    title: 'Authentication - NINAMovie'
  },
  {
    path: 'movies',
    loadChildren: () => import('./modules/movies/movies-module').then(m => m.MoviesModule),
    canActivate: [AuthGuard],
    title: 'Movies - NINAMovie'
  },
  {
    path: 'player',
    loadChildren: () => import('./modules/player/player-module').then(m => m.PlayerModule),
    canActivate: [AuthGuard],
    title: 'Player - NINAMovie'
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile-module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    title: 'Profile - NINAMovie'
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    title: 'Admin - NINAMovie'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
