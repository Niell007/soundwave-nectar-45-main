# API Documentation

## Overview

This document outlines the API endpoints and data structures used in the Soundwave DJ Platform.

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.soundwave.com/api
```

## Authentication

All API requests require authentication using a JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: {
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "string",
  "password": "string",
  "name": "string"
}

Response: {
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

### Stream Management

#### Get Stream Status
```http
GET /stream/status/{username}

Response: {
  "isLive": boolean,
  "viewers": number,
  "startTime": string,
  "title": string
}
```

#### Update Stream Info
```http
PUT /stream/info
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "category": "string"
}

Response: {
  "success": boolean,
  "message": "string"
}
```

### Event Booking

#### Create Event
```http
POST /events
Content-Type: application/json

{
  "title": "string",
  "date": "string",
  "location": "string",
  "description": "string",
  "requirements": {
    "equipment": ["string"],
    "duration": "string",
    "specialRequests": "string"
  }
}

Response: {
  "id": "string",
  "status": "string",
  "createdAt": "string"
}
```

#### Get Events
```http
GET /events
Query Parameters:
- status: "pending" | "confirmed" | "completed"
- from: "date"
- to: "date"

Response: {
  "events": [{
    "id": "string",
    "title": "string",
    "date": "string",
    "status": "string",
    "location": "string"
  }]
}
```

### Music Library

#### Upload Track
```http
POST /tracks
Content-Type: multipart/form-data

Form Data:
- file: File
- title: string
- artist: string
- genre: string
- bpm: number

Response: {
  "id": "string",
  "url": "string",
  "metadata": {
    "title": "string",
    "artist": "string",
    "duration": number
  }
}
```

#### Get Tracks
```http
GET /tracks
Query Parameters:
- genre: string
- search: string
- sort: "title" | "artist" | "date"
- page: number
- limit: number

Response: {
  "tracks": [{
    "id": "string",
    "title": "string",
    "artist": "string",
    "url": "string",
    "metadata": object
  }],
  "total": number,
  "page": number
}
```

### Chat System

#### Get Messages
```http
GET /chat/messages
Query Parameters:
- limit: number
- before: string (timestamp)

Response: {
  "messages": [{
    "id": "string",
    "content": "string",
    "sender": {
      "id": "string",
      "name": "string"
    },
    "timestamp": "string"
  }]
}
```

#### Send Message
```http
POST /chat/messages
Content-Type: application/json

{
  "content": "string",
  "type": "text" | "command"
}

Response: {
  "id": "string",
  "timestamp": "string",
  "status": "sent"
}
```

## WebSocket Events

### Stream Events
```typescript
interface StreamEvent {
  type: "viewerJoin" | "viewerLeave" | "streamStart" | "streamEnd";
  data: {
    username: string;
    timestamp: string;
    viewers?: number;
  }
}
```

### Chat Events
```typescript
interface ChatEvent {
  type: "message" | "reaction" | "command";
  data: {
    id: string;
    content: string;
    sender: {
      id: string;
      name: string;
    };
    timestamp: string;
  }
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": object | null
  }
}
```

Common Error Codes:
- `auth/invalid-credentials`: Invalid login credentials
- `auth/email-exists`: Email already registered
- `stream/not-found`: Stream not found
- `event/validation-failed`: Event validation failed
- `upload/file-too-large`: File size exceeds limit
- `rate-limit`: Too many requests

## Rate Limiting

API endpoints are rate-limited based on the following rules:
- Authentication: 5 requests per minute
- Stream Status: 60 requests per minute
- Chat Messages: 120 requests per minute
- File Upload: 10 requests per hour

Rate limit headers:
```http
X-RateLimit-Limit: number
X-RateLimit-Remaining: number
X-RateLimit-Reset: timestamp
```

## Pagination

Endpoints that return lists support pagination using:
```http
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)

Response Headers:
X-Total-Count: number
X-Total-Pages: number
```

## Data Types

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "moderator";
  createdAt: string;
  settings: {
    notifications: boolean;
    theme: "light" | "dark";
  }
}
```

### Event
```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "pending" | "confirmed" | "completed";
  requirements: {
    equipment: string[];
    duration: string;
    specialRequests: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Track
```typescript
interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  duration: number;
  url: string;
  waveform: string;
  metadata: {
    format: string;
    bitrate: number;
    tags: string[];
  };
  createdAt: string;
}
```

## Security

1. All endpoints use HTTPS
2. JWT tokens expire after 24 hours
3. File uploads are limited to 50MB
4. Input validation on all endpoints
5. CORS restrictions in place
6. Rate limiting to prevent abuse

## Versioning

The API version is specified in the URL:
```
/api/v1/resource
```

When breaking changes are introduced, a new version is created while maintaining the old version for backward compatibility.
