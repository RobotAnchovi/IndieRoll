## IndieRoll API Documentation

![alt](https://cdn.discordapp.com/attachments/1198316732088074260/1207114691394932786/Untitled_1.png?ex=65de7829&is=65cc0329&hm=8956007e7eb60d93c74454d7f9a341ab9e9da5be4d036bbc72b128d2793721ca& "Db Diagram")

## API Documentation

### USER AUTHENTICATION/AUTHORIZATION

#### Endpoints requiring proper authorization

- **Require Authentication Response**:
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Authentication required"
    }
    ```

#### Endpoints requiring proper authorization

- **Require Proper Authorization Response**:
  - **Status Code**: 403
  - **Body**:
    ```json
    {
      "message": "Forbidden"
    }
    ```

#### User Signup
- **Endpoint**: `POST /api/users/signup`
- **Description**: Registers a new user.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password",
    "name": "John Doe",
    "username": "johndoe",
    "is_creator": false,
    "user_intro": "Hello, I love movies!"
  }
  ```
- **Success Response**: `201 Created`

#### User Login
- **Endpoint**: `POST /api/users/login`
- **Description**: Authenticates a user and returns a token.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Success Response**: `200 OK`

#### Get User Profile
- **Endpoint**: `GET /api/users/profile`
- **Description**: Retrieves the profile of the currently logged-in user.
- **Require Authentication**: Yes
- **Success Response**: `200 OK`

### VIDEO CONTENT MANAGEMENT (Admin Side)

#### Add New Content
- **Endpoint**: `POST /api/content`
- **Description**: Allows admins to add new content.
- **Require Authentication**: Yes
- **Require Authorization**: Admin
- **Body**:
  ```json
  {
    "title": "New Movie Title",
    "description": "Description of the movie.",
    "genre": "Action",
    "thumbnail_url": "http://example.com/image.png",
    "video_file": "http://example.com/video.mp4"
  }
  ```
- **Success Response**: `201 Created`

#### **Get Video Content**
- **Method**: GET
- **URL**: `/api/content`
- **Require Authentication**: No

#### Update Content
- **Endpoint**: `PUT /api/content/{contentId}`
- **Description**: Allows admins to update existing content details.
- **Require Authentication**: Yes
- **Require Authorization**: Admin
- **Success Response**: `200 OK`
- **Body**:
  ```json
  {
    "title": "Updated Movie Title",
    "description": "Updated description",
    "genre": "Action"
  }
  ```

#### Delete Content
- **Endpoint**: `DELETE /api/content/{contentId}`
- **Description**: Allows admins to remove content.
- **Require Authentication**: Yes
- **Require Authorization**: Admin
- **Success Response**: `204 No Content`

### RATINGS AND REVIEWS

#### Add Rating/Review
- **Endpoint**: `POST /api/reviews`
- **Description**: Allows users to leave ratings and reviews.
- **Require Authentication**: Yes
- **Body**:
  ```json
  {
    "movie_id": 1,
    "rating": 5,
    "review_text": "Great movie!"
  }
  ```
- **Success Response**: `201 Created`

#### Update Rating/Review
- **Endpoint**: `PUT /api/reviews/{reviewId}`
- **Description**: Allows users to update their rating or review.
- **Require Authentication**: Yes
- **Success Response**: `200 OK`

#### Delete Rating/Review
- **Endpoint**: `DELETE /api/reviews/{reviewId}`
- **Description**: Allows users to delete their review.
- **Require Authentication**: Yes
- **Success Response**: `204 No Content`

### WATCHLIST MANAGEMENT

#### Add to Watchlist
- **Endpoint**: `POST /api/watchlist`
- **Description**: Allows users to add content to their watchlist.
- **Require Authentication**: Yes
- **Body**:
  ```json
  {
    "movie_id": 1
  }
  ```
- **Success Response**: `201 Created`

#### View Watchlist
- **Endpoint**: `GET /api/watchlist`
- **Description**: Allows users to view their watchlist.
- **Require Authentication**: Yes
- **Success Response**: `200 OK`

#### Remove from Watchlist
- **Endpoint**: `DELETE /api/watchlist/{watchlistId}`
- **Description**: Allows users to remove content from their watchlist.
- **Require Authentication**: Yes
- **Success Response**: `204 No Content`

### USER PROFILE MANAGEMENT

#### Update Profile
- **Endpoint**: `PUT /api/users/profile`
- **Description**: Allows users to update their profile information.
- **Require Authentication**: Yes
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "username": "janedoe",
    "user_intro": "Updated intro message."
  }
  ```
- **Success Response**: `200 OK`

#### Delete Profile
- **Endpoint**: `DELETE /api/users/profile`
- **Description**: Allows users to delete their account.
- **Require Authentication**: Yes
- **Success Response**: `204 No Content`
