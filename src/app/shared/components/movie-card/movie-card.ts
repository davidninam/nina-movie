import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IMovie } from '../../../core/interfaces';
import { formatDuration, getRatingStars, getPlaceholderImage } from '../../../core/utils';

/**
 * Movie Card Component
 * Follows Single Responsibility Principle - displays only movie card information
 * Follows Open/Closed Principle - extensible through inputs/outputs
 */
@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCard {
  @Input() movie!: IMovie;
  @Input() showDescription: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() movieClick = new EventEmitter<IMovie>();
  @Output() playClick = new EventEmitter<IMovie>();
  @Output() addToWatchlist = new EventEmitter<IMovie>();

  /**
   * Get formatted duration
   */
  get formattedDuration(): string {
    return formatDuration(this.movie.duration);
  }

  /**
   * Get rating stars (1-5)
   */
  get ratingStars(): number {
    return getRatingStars(this.movie.rating);
  }

  /**
   * Get poster image with fallback
   */
  get posterImage(): string {
    return this.movie.posterUrl || getPlaceholderImage();
  }

  /**
   * Handle movie card click
   */
  onMovieClick(): void {
    this.movieClick.emit(this.movie);
  }

  /**
   * Handle play button click
   */
  onPlayClick(event: Event): void {
    event.stopPropagation();
    this.playClick.emit(this.movie);
  }

  /**
   * Handle add to watchlist click
   */
  onAddToWatchlist(event: Event): void {
    event.stopPropagation();
    this.addToWatchlist.emit(this.movie);
  }
}
