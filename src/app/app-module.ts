import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MovieCard } from './shared/components/movie-card/movie-card';
import { MovieCarousel } from './shared/components/movie-carousel/movie-carousel';

@NgModule({
  declarations: [
    App,
    MovieCard,
    MovieCarousel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
