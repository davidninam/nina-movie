/**
 * Utility functions for movie operations
 * Follows Single Responsibility Principle - each function has one purpose
 */

/**
 * Format movie duration from minutes to hours:minutes
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Get movie rating stars (1-5 based on 1-10 rating)
 */
export function getRatingStars(rating: number): number {
  return Math.round(rating / 2);
}

/**
 * Format movie year for display
 */
export function formatYear(year: number): string {
  return year.toString();
}

/**
 * Get movie quality badge color
 */
export function getQualityColor(quality: string): string {
  switch (quality) {
    case '4K':
      return '#ff6b6b';
    case '1080p':
      return '#4ecdc4';
    case '720p':
      return '#45b7d1';
    default:
      return '#95a5a6';
  }
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate movie poster placeholder URL
 */
export function getPlaceholderImage(width: number = 300, height: number = 450): string {
  return `https://via.placeholder.com/${width}x${height}/2c3e50/ecf0f1?text=No+Image`;
}

/**
 * Check if movie is recently added (within last 30 days)
 */
export function isRecentlyAdded(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(createdAt) > thirtyDaysAgo;
}