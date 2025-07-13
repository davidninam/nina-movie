import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVideoPlayer, IPlayerState, IVideoSource, ISubtitle } from '../interfaces';

/**
 * Video Player Service
 * Follows Single Responsibility Principle - handles only video player logic
 * Implements IVideoPlayer interface (Interface Segregation Principle)
 */
@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService implements IVideoPlayer {
  private videoElement: HTMLVideoElement | null = null;
  
  private playerStateSubject = new BehaviorSubject<IPlayerState>({
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    quality: '720p',
    isFullscreen: false,
    subtitlesEnabled: false,
    isLoading: false
  });
  
  public readonly playerState$ = this.playerStateSubject.asObservable();
  
  private sources: IVideoSource[] = [];
  private subtitles: ISubtitle[] = [];

  /**
   * Initialize video element
   */
  initializePlayer(videoElement: HTMLVideoElement): void {
    this.videoElement = videoElement;
    this.setupEventListeners();
  }

  /**
   * Set video sources
   */
  setSources(sources: IVideoSource[]): void {
    this.sources = sources;
    if (this.videoElement && sources.length > 0) {
      this.videoElement.src = sources[0].url;
      this.updatePlayerState({ quality: sources[0].quality });
    }
  }

  /**
   * Set subtitles
   */
  setSubtitles(subtitles: ISubtitle[]): void {
    this.subtitles = subtitles;
    // Add subtitle tracks to video element
    if (this.videoElement) {
      this.clearSubtitleTracks();
      subtitles.forEach(subtitle => this.addSubtitleTrack(subtitle));
    }
  }

  /**
   * Play video
   */
  play(): void {
    if (this.videoElement) {
      this.updatePlayerState({ isLoading: true });
      this.videoElement.play()
        .then(() => {
          this.updatePlayerState({ 
            isPlaying: true, 
            isPaused: false, 
            isLoading: false 
          });
        })
        .catch(error => {
          console.error('Failed to play video:', error);
          this.updatePlayerState({ 
            isLoading: false, 
            error: 'Failed to play video' 
          });
        });
    }
  }

  /**
   * Pause video
   */
  pause(): void {
    if (this.videoElement) {
      this.videoElement.pause();
      this.updatePlayerState({ 
        isPlaying: false, 
        isPaused: true 
      });
    }
  }

  /**
   * Stop video
   */
  stop(): void {
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.currentTime = 0;
      this.updatePlayerState({ 
        isPlaying: false, 
        isPaused: false, 
        currentTime: 0 
      });
    }
  }

  /**
   * Seek to specific time
   */
  seek(time: number): void {
    if (this.videoElement) {
      this.videoElement.currentTime = time;
      this.updatePlayerState({ currentTime: time });
    }
  }

  /**
   * Set volume
   */
  setVolume(volume: number): void {
    if (this.videoElement) {
      this.videoElement.volume = Math.max(0, Math.min(1, volume));
      this.updatePlayerState({ volume: this.videoElement.volume });
    }
  }

  /**
   * Set video quality
   */
  setQuality(quality: string): void {
    const source = this.sources.find(s => s.quality === quality);
    if (source && this.videoElement) {
      const currentTime = this.videoElement.currentTime;
      const wasPlaying = !this.videoElement.paused;
      
      this.videoElement.src = source.url;
      this.videoElement.currentTime = currentTime;
      
      if (wasPlaying) {
        this.videoElement.play();
      }
      
      this.updatePlayerState({ quality });
    }
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      this.videoElement?.requestFullscreen();
      this.updatePlayerState({ isFullscreen: true });
    } else {
      document.exitFullscreen();
      this.updatePlayerState({ isFullscreen: false });
    }
  }

  /**
   * Toggle subtitles
   */
  toggleSubtitles(): void {
    const currentState = this.playerStateSubject.value;
    const newState = !currentState.subtitlesEnabled;
    
    if (this.videoElement) {
      const tracks = this.videoElement.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = newState ? 'showing' : 'hidden';
      }
    }
    
    this.updatePlayerState({ subtitlesEnabled: newState });
  }

  /**
   * Get current player state
   */
  getCurrentState(): IPlayerState {
    return this.playerStateSubject.value;
  }

  /**
   * Get available qualities
   */
  getAvailableQualities(): string[] {
    return this.sources.map(source => source.quality);
  }

  /**
   * Get available subtitles
   */
  getAvailableSubtitles(): ISubtitle[] {
    return this.subtitles;
  }

  /**
   * Setup event listeners for video element
   */
  private setupEventListeners(): void {
    if (!this.videoElement) return;

    this.videoElement.addEventListener('loadedmetadata', () => {
      this.updatePlayerState({ 
        duration: this.videoElement!.duration 
      });
    });

    this.videoElement.addEventListener('timeupdate', () => {
      this.updatePlayerState({ 
        currentTime: this.videoElement!.currentTime 
      });
    });

    this.videoElement.addEventListener('ended', () => {
      this.updatePlayerState({ 
        isPlaying: false, 
        isPaused: false 
      });
    });

    this.videoElement.addEventListener('error', (error) => {
      console.error('Video error:', error);
      this.updatePlayerState({ 
        error: 'Video playback error',
        isLoading: false 
      });
    });

    this.videoElement.addEventListener('waiting', () => {
      this.updatePlayerState({ isLoading: true });
    });

    this.videoElement.addEventListener('canplay', () => {
      this.updatePlayerState({ isLoading: false });
    });

    // Fullscreen change events
    document.addEventListener('fullscreenchange', () => {
      this.updatePlayerState({ 
        isFullscreen: !!document.fullscreenElement 
      });
    });
  }

  /**
   * Update player state
   */
  private updatePlayerState(partialState: Partial<IPlayerState>): void {
    const currentState = this.playerStateSubject.value;
    const newState = { ...currentState, ...partialState };
    this.playerStateSubject.next(newState);
  }

  /**
   * Clear existing subtitle tracks
   */
  private clearSubtitleTracks(): void {
    if (this.videoElement) {
      const tracks = this.videoElement.textTracks;
      for (let i = tracks.length - 1; i >= 0; i--) {
        const track = tracks[i];
        if (track.kind === 'subtitles') {
          // Remove track (browsers handle this differently)
          track.mode = 'disabled';
        }
      }
    }
  }

  /**
   * Add subtitle track
   */
  private addSubtitleTrack(subtitle: ISubtitle): void {
    if (this.videoElement) {
      const track = this.videoElement.addTextTrack('subtitles', subtitle.label, subtitle.language);
      track.mode = subtitle.isDefault ? 'showing' : 'hidden';
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = '';
      this.videoElement = null;
    }
    
    this.playerStateSubject.next({
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      quality: '720p',
      isFullscreen: false,
      subtitlesEnabled: false,
      isLoading: false
    });
  }
}