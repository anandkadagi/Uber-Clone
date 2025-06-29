# Uber Clone Backend API Documentation

## User Registration

### POST `/users/register`

**Description:**  
Register a new user.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- `fullname` (string, min 3 chars)
- `email` (string, valid email)
- `password` (string, min 5 chars)

**Responses:**
- `201 Created`:  
  Returns `{ token, user }`
- `400 Bad Request`:  
  Validation errors
- `409 Conflict`:  
  User already exists

---

## User Login

### POST `/users/login`

**Description:**  
Login an existing user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Responses:**
- `200 OK`:  
  Returns `{ token, user }` and sets a cookie
- `400 Bad Request`:  
  Validation errors
- `401 Unauthorized`:  
  Invalid credentials

---

## User Profile

### GET `/users/userProfile`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Get the authenticated user's profile.

**Responses:**
- `200 OK`:  
  Returns `{ user }`
- `401 Unauthorized`:  
  Not authenticated

---

## User Logout

### GET `/users/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Logs out the user and blacklists the token.

**Responses:**
- `200 OK`:  
  Returns success message

---

## Captain Registration

### POST `/captains/register`

**Description:**  
Register a new captain.

**Request Body:**
```json
{
  "fullname": "Jane Captain",
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Responses:**
- `201 Created`:  
  Returns `{ token, captain }`
- `400 Bad Request`:  
  Validation errors
- `409 Conflict`:  
  Captain already exists

---

## Captain Login

### POST `/captains/login`

**Description:**  
Login an existing captain.

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Responses:**
- `200 OK`:  
  Returns `{ token, captain }` and sets a cookie
- `400 Bad Request`:  
  Validation errors
- `401 Unauthorized`:  
  Invalid credentials

---

## Captain Profile

### GET `/captains/captainProfile`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Get the authenticated captain's profile.

---

## Captain Logout

### GET `/captains/logout`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Logs out the captain and blacklists the token.

---

## Ride Creation

### POST `/ride/create`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Create a new ride.

**Request Body:**
```json
{
  "pickup": "Pickup Address",
  "destination": "Destination Address",
  "vehicleType": "car"
}
```

**Responses:**
- `200 OK`:  
  Returns ride details
- `400 Bad Request`:  
  Validation errors

---

## Get Fare

### POST `/ride/fair`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "pick": "Pickup Address",
  "drop": "Destination Address"
}
```

**Responses:**
- `200 OK`:  
  Returns `{ response: { bike, auto, car } }`

---

## Confirm Ride

### POST `/ride/confirm`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "ride": { ...rideObject },
  "captain_id": "captainObjectId"
}
```

---

## Start Ride

### POST `/ride/start-ride`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "ride_id": "rideObjectId",
  "otp": "123456",
  "captain_id": "captainObjectId"
}
```

---

## End Ride

### POST `/ride/end-ride`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "ride_id": "rideObjectId"
}
```

---

## Get Captain Earnings

### GET `/ride/earnings`

**Headers:**  
`Authorization: Bearer <token>`

---

## Set Captain Status

### POST `/ride/set_status`

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "captain_id": "captainObjectId",
  "status": "online" // or "offline"
}
```

---

## Maps API

### GET `/maps/getLocation?address=...`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Get latitude and longitude for an address.

---

### GET `/maps/getDistance?origin=...&destination=...`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Get distance and duration between two addresses.

---

### GET `/maps/getSuggestions?input=...`

**Headers:**  
`Authorization: Bearer <token>`

**Description:**  
Get address suggestions for autocomplete.

---
