# NINAMovie

A Netflix-inspired streaming platform built with Angular 19+ following SOLID principles and Clean Code practices.

![NINAMovie Login](https://github.com/user-attachments/assets/e9148a4d-8430-45a3-8984-65417072578f)

## ✨ Features

- **🎬 Netflix-Style Interface**: Modern, responsive UI with smooth animations
- **🔐 Authentication**: Secure JWT-based login and registration
- **🎭 Movie Catalog**: Browse, search, and discover movies with interactive carousels
- **🎥 Video Streaming**: High-quality video playback with multiple resolutions
- **👤 User Profiles**: Personalized recommendations and watchlists
- **⚙️ Admin Panel**: Content management and analytics
- **🎨 Modern Design**: "Explora lo invisible" - surreal, modern aesthetic

![NINAMovie Home](https://github.com/user-attachments/assets/623b6baf-8f61-46e1-93ff-358c20abc087)

## 🏗️ Architecture

The application follows SOLID principles:

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components are extensible without modification  
- **Liskov Substitution**: Interface contracts are properly maintained
- **Interface Segregation**: Clean, focused interfaces
- **Dependency Inversion**: Proper dependency injection usage

## 🛠️ Technology Stack

- **Angular 20+** (with Angular 19+ features)
- **TypeScript** for type safety
- **RxJS** for reactive programming
- **Angular Material & CDK** for UI components
- **SCSS** for modern styling
- **JWT** for authentication
- **Compodoc** for documentation

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Generate documentation
npm run compodoc
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                # Services, interceptors, guards, utilities
│   │   ├── interfaces/      # TypeScript interfaces (Interface Segregation)
│   │   ├── services/        # Business logic services (Single Responsibility)
│   │   ├── guards/          # Route protection
│   │   ├── interceptors/    # HTTP interceptors
│   │   └── utils/           # Utility functions
│   ├── shared/              # Reusable components, pipes, directives
│   │   └── components/      # MovieCard, MovieCarousel components
│   ├── modules/             # Feature modules (lazy-loaded)
│   │   ├── auth/            # Authentication module
│   │   ├── movies/          # Movie catalog module
│   │   ├── player/          # Video player module
│   │   ├── admin/           # Admin panel module
│   │   └── profile/         # User profile module
│   ├── pages/               # Page components
│   └── app-routing.module.ts
├── assets/                  # Images, icons, styles
├── environments/            # Environment configurations
└── index.html
```

## 🎯 Clean Code Principles

- **Descriptive naming**: Clear, self-documenting code
- **Small functions**: Each function has a single purpose
- **DRY principle**: Don't Repeat Yourself
- **KISS principle**: Keep It Simple, Stupid
- **Consistent formatting**: Uniform code style throughout

## 🔧 Development Commands

```bash
# Development server
ng serve

# Code scaffolding
ng generate component component-name

# Build
ng build

# Running unit tests
ng test

# Generate documentation
npm run compodoc

# Build documentation
npm run compodoc:build
```

## 📖 Documentation

This project uses [Compodoc](https://compodoc.app/) for generating technical documentation. The documentation includes:

- Component API documentation
- Service descriptions
- Architecture diagrams
- Code coverage reports

## 🎨 Design Philosophy

NINAMovie embraces the motto "Explora lo invisible" (Explore the invisible), featuring:

- Dark, elegant themes inspired by Netflix
- Smooth animations and transitions
- Responsive design for all devices
- Accessibility-first approach
- Modern CSS techniques with gradients and blur effects

## 🚧 Development Guidelines

1. Follow SOLID principles in all new code
2. Use TypeScript interfaces for type safety
3. Implement proper error handling
4. Write descriptive commit messages
5. Maintain consistent code formatting
6. Add JSDoc comments for complex functions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔐 Security Features

- JWT token-based authentication
- Route guards for protected areas
- HTTP interceptors for automatic token handling
- Secure password validation
- XSS protection through Angular's built-in sanitization

---

Built with ❤️ using Angular and modern web technologies.
