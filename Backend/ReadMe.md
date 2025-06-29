
# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user. It requires the user's full name, email, and password.

### Request Body
The request body must be a JSON object containing the following fields:
- `fullname` (string): The full name of the user. Must be at least 3 characters long.
- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 5 characters long.

### Response

#### Success (201 Created)
- **Status Code**: 201
- **Body**: A JSON object containing the authentication token and user details.
  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": "User Fullname",
      "email": "user@example.com",
      // ...other user details...
    }
  }
  ```

#### Validation Error (400 Bad Request)
- **Status Code**: 400
- **Body**: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password should be at least 5 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "First name should be at least 3 characters long",
        "param": "fullname",
        "location": "body"
      }
    ]
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
```