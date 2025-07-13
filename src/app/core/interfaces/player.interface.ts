/**
 * Video player interface
 * Follows Interface Segregation Principle - specific to video playback
 */
export interface IVideoPlayer {
  play(): void;
  pause(): void;
  stop(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  setQuality(quality: string): void;
  toggleFullscreen(): void;
  toggleSubtitles(): void;
}

/**
 * Player state interface
 */
export interface IPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  quality: string;
  isFullscreen: boolean;
  subtitlesEnabled: boolean;
  isLoading: boolean;
  error?: string;
}

/**
 * Video source interface
 */
export interface IVideoSource {
  url: string;
  quality: string;
  type: string;
}

/**
 * Subtitle interface
 */
export interface ISubtitle {
  language: string;
  label: string;
  url: string;
  isDefault?: boolean;
}