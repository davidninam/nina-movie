import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MovieCard } from './shared/components/movie-card/movie-card';
import { MovieCarousel } from './shared/components/movie-carousel/movie-carousel';
import { JwtInterceptor } from './core/interceptors';
import { environment } from '../environments/environment';
import { Home } from './pages/home/home';

/**
 * Main Application Module
 * Follows Dependency Inversion Principle - depends on abstractions through DI
 */
@NgModule({
  declarations: [
    App,
    MovieCard,
    MovieCarousel,
    Home
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('nina_movie_token'),
        allowedDomains: [new URL(environment.apiUrl).hostname],
        disallowedRoutes: [`${environment.apiUrl}/auth/login`, `${environment.apiUrl}/auth/register`]
      }
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
