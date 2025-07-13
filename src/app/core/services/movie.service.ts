import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IMovie, IMovieFilters, IMovieSearchResult } from '../interfaces';

/**
 * Movie Service
 * Follows Single Responsibility Principle - handles only movie-related operations
 * Follows Open/Closed Principle - extensible for new movie operations
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  
  private featuredMoviesSubject = new BehaviorSubject<IMovie[]>([]);
  public readonly featuredMovies$ = this.featuredMoviesSubject.asObservable();
  
  private popularMoviesSubject = new BehaviorSubject<IMovie[]>([]);
  public readonly popularMovies$ = this.popularMoviesSubject.asObservable();

  /**
   * Get all movies with optional filters
   */
  getMovies(filters?: IMovieFilters, page: number = 1, pageSize: number = 20): Observable<IMovieSearchResult> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.genre?.length) {
        params = params.set('genre', filters.genre.join(','));
      }
      if (filters.year) {
        params = params.set('year', filters.year.toString());
      }
      if (filters.rating) {
        params = params.set('rating', filters.rating.toString());
      }
      if (filters.quality?.length) {
        params = params.set('quality', filters.quality.join(','));
      }
      if (filters.language) {
        params = params.set('language', filters.language);
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params = params.set('sortOrder', filters.sortOrder);
      }
    }

    return this.http.get<IMovieSearchResult>(`${environment.apiUrl}/movies`, { params })
      .pipe(
        catchError(error => {
          console.error('Failed to fetch movies:', error);
          return of({
            movies: [],
            totalCount: 0,
            page: 1,
            pageSize: 20,
            totalPages: 0
          });
        })
      );
  }

  /**
   * Get movie by ID
   */
  getMovieById(id: string): Observable<IMovie | null> {
    return this.http.get<IMovie>(`${environment.apiUrl}/movies/${id}`)
      .pipe(
        catchError(error => {
          console.error('Failed to fetch movie:', error);
          return of(null);
        })
      );
  }

  /**
   * Search movies by title
   */
  searchMovies(query: string, page: number = 1, pageSize: number = 20): Observable<IMovieSearchResult> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<IMovieSearchResult>(`${environment.apiUrl}/movies/search`, { params })
      .pipe(
        catchError(error => {
          console.error('Failed to search movies:', error);
          return of({
            movies: [],
            totalCount: 0,
            page: 1,
            pageSize: 20,
            totalPages: 0
          });
        })
      );
  }

  /**
   * Get featured movies
   */
  getFeaturedMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.apiUrl}/movies/featured`)
      .pipe(
        map(movies => {
          this.featuredMoviesSubject.next(movies);
          return movies;
        }),
        catchError(error => {
          console.error('Failed to fetch featured movies:', error);
          return of([]);
        })
      );
  }

  /**
   * Get popular movies
   */
  getPopularMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.apiUrl}/movies/popular`)
      .pipe(
        map(movies => {
          this.popularMoviesSubject.next(movies);
          return movies;
        }),
        catchError(error => {
          console.error('Failed to fetch popular movies:', error);
          return of([]);
        })
      );
  }

  /**
   * Get movies by genre
   */
  getMoviesByGenre(genre: string, page: number = 1, pageSize: number = 20): Observable<IMovieSearchResult> {
    return this.getMovies({ genre: [genre] }, page, pageSize);
  }

  /**
   * Get recommended movies for user
   */
  getRecommendedMovies(userId: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.apiUrl}/movies/recommendations/${userId}`)
      .pipe(
        catchError(error => {
          console.error('Failed to fetch recommended movies:', error);
          return of([]);
        })
      );
  }

  /**
   * Get available genres
   */
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/movies/genres`)
      .pipe(
        catchError(error => {
          console.error('Failed to fetch genres:', error);
          return of([]);
        })
      );
  }

  /**
   * Rate a movie
   */
  rateMovie(movieId: string, rating: number): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${environment.apiUrl}/movies/${movieId}/rate`, { rating })
      .pipe(
        map(response => response.success),
        catchError(error => {
          console.error('Failed to rate movie:', error);
          return of(false);
        })
      );
  }

  /**
   * Add movie to watchlist
   */
  addToWatchlist(movieId: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${environment.apiUrl}/movies/${movieId}/watchlist`, {})
      .pipe(
        map(response => response.success),
        catchError(error => {
          console.error('Failed to add to watchlist:', error);
          return of(false);
        })
      );
  }

  /**
   * Remove movie from watchlist
   */
  removeFromWatchlist(movieId: string): Observable<boolean> {
    return this.http.delete<{ success: boolean }>(`${environment.apiUrl}/movies/${movieId}/watchlist`)
      .pipe(
        map(response => response.success),
        catchError(error => {
          console.error('Failed to remove from watchlist:', error);
          return of(false);
        })
      );
  }
}