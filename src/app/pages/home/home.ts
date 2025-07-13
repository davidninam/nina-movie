import { Component, OnInit } from '@angular/core';
import { IMovie, VideoQuality } from '../../core/interfaces';

/**
 * Home Page Component
 * Netflix-style home page with movie carousels
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  featuredMovies: IMovie[] = [];
  popularMovies: IMovie[] = [];
  actionMovies: IMovie[] = [];

  ngOnInit(): void {
    this.loadSampleMovies();
  }

  /**
   * Load sample movie data for demonstration
   */
  private loadSampleMovies(): void {
    this.featuredMovies = [
      this.createSampleMovie('1', 'The Matrix', 'Action, Sci-Fi', 1999, 8.7),
      this.createSampleMovie('2', 'Inception', 'Action, Thriller', 2010, 8.8),
      this.createSampleMovie('3', 'Interstellar', 'Drama, Sci-Fi', 2014, 8.6),
      this.createSampleMovie('4', 'The Dark Knight', 'Action, Crime', 2008, 9.0),
      this.createSampleMovie('5', 'Pulp Fiction', 'Crime, Drama', 1994, 8.9),
    ];

    this.popularMovies = [
      this.createSampleMovie('6', 'Avatar', 'Action, Adventure', 2009, 7.8),
      this.createSampleMovie('7', 'Titanic', 'Drama, Romance', 1997, 7.9),
      this.createSampleMovie('8', 'Star Wars', 'Adventure, Fantasy', 1977, 8.6),
      this.createSampleMovie('9', 'Jurassic Park', 'Adventure, Sci-Fi', 1993, 8.1),
      this.createSampleMovie('10', 'The Godfather', 'Crime, Drama', 1972, 9.2),
    ];

    this.actionMovies = [
      this.createSampleMovie('11', 'John Wick', 'Action, Thriller', 2014, 7.4),
      this.createSampleMovie('12', 'Mad Max: Fury Road', 'Action, Adventure', 2015, 8.1),
      this.createSampleMovie('13', 'Die Hard', 'Action, Thriller', 1988, 8.2),
      this.createSampleMovie('14', 'Mission Impossible', 'Action, Adventure', 1996, 7.1),
      this.createSampleMovie('15', 'The Terminator', 'Action, Sci-Fi', 1984, 8.0),
    ];
  }

  /**
   * Create sample movie object
   */
  private createSampleMovie(id: string, title: string, genre: string, year: number, rating: number): IMovie {
    return {
      id,
      title,
      description: `Experience the thrilling adventure of ${title}. A captivating story that will keep you on the edge of your seat.`,
      genre: genre.split(', '),
      director: 'Sample Director',
      cast: ['Actor 1', 'Actor 2', 'Actor 3'],
      year,
      duration: 120 + Math.floor(Math.random() * 60), // Random duration between 120-180 minutes
      rating,
      posterUrl: `https://picsum.photos/300/450?random=${id}`,
      backdropUrl: `https://picsum.photos/1200/675?random=${id}`,
      trailerUrl: '',
      videoUrl: '',
      quality: [VideoQuality.HD_720, VideoQuality.FULL_HD_1080],
      language: 'English',
      subtitles: ['English', 'Spanish', 'French'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
  }

  /**
   * Handle movie click
   */
  onMovieClick(movie: IMovie): void {
    console.log('Movie clicked:', movie.title);
    // Navigate to movie detail page
  }

  /**
   * Handle play button click
   */
  onPlayClick(movie: IMovie): void {
    console.log('Play clicked:', movie.title);
    // Navigate to player
  }

  /**
   * Handle add to watchlist
   */
  onAddToWatchlist(movie: IMovie): void {
    console.log('Added to watchlist:', movie.title);
    // Add to watchlist logic
  }
}
