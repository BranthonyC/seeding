# Apple Music Analytics API Spec

## 1. Get Artist Royalties
**Endpoint:** `GET /api/analytics/royalties`
**Description:** Retorna el tiempo total reproducido por artista en los últimos 30 días.
**Response:**
```json
[
  { "artist": "Bad Bunny", "total_seconds_played": 45000 },
  { "artist": "Taylor Swift", "total_seconds_played": 32000 }
]

```

## 2. Top Songs by Region
**Endpoint:** `GET /api/charts/top-songs`
**Query Params:** ?region=GT&days=7
**Response:**
```json

[
  { "song": "Luna", "artist": "Feid", "plays": 150 },
  { "song": "Monaco", "artist": "Bad Bunny", "plays": 120 }
]

```

## 3. Zombie Users Risk
**Endpoint:** GET /api/users/churn-risk
**Response:**
```json
[
  { "username": "usuario1", "email": "u1@mail.com", "subscription": "Premium" }
]
```

## 4. Demographics by Genre
**Endpoint:** `GET /api/analytics/demographics`
**Query Params:** ?genre=Reggaeton
**Response:**
```json
[
  { "_id": 15, "range": "15-20", "count": 45 },
  { "_id": 21, "range": "21-30", "count": 120 }
]
```

## 5. Heavy Listeners
**Endpoint:** `GET /api/users/heavy-listeners`
**Query Params:** ?artist=Bad Bunny
**Response:**
```json
[
  { "username": "fan_numero1", "unique_artist_songs": 18 },
  { "username": "music_lover", "unique_artist_songs": 15 }
]
```