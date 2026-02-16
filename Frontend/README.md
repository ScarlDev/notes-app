# Flutter Notes App

Production-ready Flutter application with Clean Architecture (MVVM) consuming REST API.

## Tech Stack

- **State Management**: Provider
- **Networking**: Dio
- **Storage**: flutter_secure_storage
- **Routing**: go_router
- **Backend**: Node.js REST API (port 3000)

## Project Structure

```
lib/
├── main.dart
├── core/
│   ├── api_client.dart
│   └── constants.dart
├── models/
│   ├── user.dart
│   └── note.dart
├── providers/
│   ├── auth_provider.dart
│   └── notes_provider.dart
└── screens/
    ├── login_screen.dart
    ├── register_screen.dart
    └── home_screen.dart
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd Frontend
flutter pub get
```

### 2. Configure Android Device (if using physical device)

```bash
adb reverse tcp:3000 tcp:3000
```

### 3. Run the Application

```bash
flutter run
```

## Features

- Login and Register with JWT authentication
- Automatic token injection via Dio interceptors
- Secure token storage using flutter_secure_storage
- Notes list with pull-to-refresh
- Swipe-to-delete notes
- Create new notes with dialog
- Automatic navigation based on auth state

## API Endpoints Used

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/notes`
- `POST /api/notes`
- `DELETE /api/notes/:id`

## Architecture

### MVVM Pattern

- **Models**: Data entities (User, Note)
- **Views**: UI screens (Login, Register, Home)
- **ViewModels**: Providers managing state and business logic

### Clean Architecture Layers

- **Core**: API client, constants, configuration
- **Models**: Data models with JSON serialization
- **Providers**: State management and business logic
- **Screens**: UI components

## Key Components

### API Client with Interceptor

The Dio interceptor automatically adds JWT token to all requests:

```dart
Authorization: Bearer <token>
```

### Secure Storage

JWT tokens are stored securely using platform-specific storage:
- Android: KeyStore
- iOS: Keychain

### Navigation

go_router handles navigation with automatic redirects based on authentication state.

## Requirements

- Flutter SDK >= 3.0.0
- Backend running on http://127.0.0.1:3000

## Notes

For Android physical devices, use `adb reverse tcp:3000 tcp:3000` to forward localhost requests.

For iOS simulator, localhost works directly.
