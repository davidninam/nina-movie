import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing-module';
import { MovieList } from './pages/movie-list/movie-list';
import { MovieDetail } from './pages/movie-detail/movie-detail';


@NgModule({
  declarations: [
    MovieList,
    MovieDetail
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
