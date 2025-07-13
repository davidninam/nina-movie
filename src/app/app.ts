import { Component, signal } from '@angular/core';

/**
 * Main App Component
 * Follows Single Responsibility Principle - serves as root component container
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('NINAMovie');
}
