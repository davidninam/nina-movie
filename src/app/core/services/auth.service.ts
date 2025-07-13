import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { IUser, IJwtToken, ILoginCredentials, IRegisterData } from '../interfaces';

/**
 * Authentication Service
 * Follows Single Responsibility Principle - handles only authentication logic
 * Follows Dependency Inversion Principle - depends on abstractions (HttpClient, JwtHelperService)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly jwtHelper = inject(JwtHelperService);
  
  private readonly TOKEN_KEY = 'nina_movie_token';
  private readonly REFRESH_TOKEN_KEY = 'nina_movie_refresh_token';
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state on service creation
   */
  private initializeAuth(): void {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const user = this.getUserFromToken(token);
      if (user) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  /**
   * Login user with credentials
   */
  login(credentials: ILoginCredentials): Observable<IJwtToken> {
    return this.http.post<IJwtToken>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }

  /**
   * Register new user
   */
  register(registerData: IRegisterData): Observable<IJwtToken> {
    return this.http.post<IJwtToken>(`${environment.apiUrl}/auth/register`, registerData)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          console.error('Registration failed:', error);
          throw error;
        })
      );
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.clearTokens();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<IJwtToken> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http.post<IJwtToken>(`${environment.apiUrl}/auth/refresh`, {
      refreshToken
    }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        this.logout();
        throw error;
      })
    );
  }

  /**
   * Get current user
   */
  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get stored refresh token
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if current token is valid
   */
  private hasValidToken(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: IJwtToken): void {
    this.storeTokens(response.token, response.refreshToken);
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Store tokens in localStorage
   */
  private storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Clear stored tokens
   */
  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Extract user data from JWT token
   */
  private getUserFromToken(token: string): IUser | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.user || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}