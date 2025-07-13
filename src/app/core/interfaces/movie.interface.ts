/**
 * Movie data interface
 * Follows Interface Segregation Principle - specific to movie data
 */
export interface IMovie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  director: string;
  cast: string[];
  year: number;
  duration: number; // in minutes
  rating: number; // 0-10
  posterUrl: string;
  backdropUrl?: string;
  trailerUrl?: string;
  videoUrl?: string;
  quality: VideoQuality[];
  language: string;
  subtitles: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export enum VideoQuality {
  HD_720 = '720p',
  FULL_HD_1080 = '1080p',
  UHD_4K = '4K'
}

/**
 * Movie search filters interface
 */
export interface IMovieFilters {
  genre?: string[];
  year?: number;
  rating?: number;
  quality?: VideoQuality[];
  language?: string;
  sortBy?: MovieSortBy;
  sortOrder?: SortOrder;
}

export enum MovieSortBy {
  TITLE = 'title',
  YEAR = 'year',
  RATING = 'rating',
  CREATED_AT = 'createdAt'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * Movie search result interface
 */
export interface IMovieSearchResult {
  movies: IMovie[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}