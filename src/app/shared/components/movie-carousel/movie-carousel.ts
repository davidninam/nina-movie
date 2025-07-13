import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { IMovie } from '../../../core/interfaces';

/**
 * Movie Carousel Component
 * Follows Single Responsibility Principle - handles only movie carousel display
 * Netflix-style horizontal scrolling carousel
 */
@Component({
  selector: 'app-movie-carousel',
  standalone: false,
  templateUrl: './movie-carousel.html',
  styleUrl: './movie-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCarousel implements OnInit {
  @Input() title!: string;
  @Input() movies: IMovie[] = [];
  @Input() cardSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() showDescription: boolean = false;

  @Output() movieClick = new EventEmitter<IMovie>();
  @Output() playClick = new EventEmitter<IMovie>();
  @Output() addToWatchlist = new EventEmitter<IMovie>();

  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  currentSlide = 0;
  maxSlides = 0;

  ngOnInit(): void {
    this.calculateMaxSlides();
  }

  /**
   * Calculate maximum number of slides based on container width
   */
  private calculateMaxSlides(): void {
    const containerWidth = this.carousel?.nativeElement?.clientWidth || 1200;
    const cardWidth = this.getCardWidth() + 16; // Include gap
    const visibleCards = Math.floor(containerWidth / cardWidth);
    this.maxSlides = Math.max(0, this.movies.length - visibleCards);
  }

  /**
   * Get card width based on size
   */
  private getCardWidth(): number {
    switch (this.cardSize) {
      case 'small': return 180;
      case 'large': return 280;
      default: return 220;
    }
  }

  /**
   * Scroll to previous set of movies
   */
  scrollPrevious(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  /**
   * Scroll to next set of movies
   */
  scrollNext(): void {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  /**
   * Check if previous button should be disabled
   */
  get isPreviousDisabled(): boolean {
    return this.currentSlide === 0;
  }

  /**
   * Check if next button should be disabled
   */
  get isNextDisabled(): boolean {
    return this.currentSlide >= this.maxSlides;
  }

  /**
   * Get transform style for carousel
   */
  get carouselTransform(): string {
    const cardWidth = this.getCardWidth() + 16;
    const translateX = this.currentSlide * cardWidth;
    return `translateX(-${translateX}px)`;
  }

  /**
   * Handle movie card click
   */
  onMovieClick(movie: IMovie): void {
    this.movieClick.emit(movie);
  }

  /**
   * Handle play button click
   */
  onPlayClick(movie: IMovie): void {
    this.playClick.emit(movie);
  }

  /**
   * Handle add to watchlist click
   */
  onAddToWatchlist(movie: IMovie): void {
    this.addToWatchlist.emit(movie);
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByMovieId(index: number, movie: IMovie): string {
    return movie.id;
  }
}
