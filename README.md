# Blogging Site Mini Project Documentation

## Introduction
The Blogging Site Mini Project is a web application that provides a platform for authors to create and publish their blogs. It allows users to register as authors, create blog posts, view published blogs, and perform various operations on blogs such as editing, deleting, and filtering. The project is developed using Node.js, Express.js, and MongoDB.

## Features
The Blogging Site Mini Project includes the following features:

### Author Management
- Register a new author
- Login as an author
- Authentication and authorization using JWT tokens

### Blog Management
- Create a new blog post
- Edit an existing blog post
- Delete a blog post
- View published blogs
- Filter blogs by author, category, tags, and subcategory

## Technologies Used
The project utilizes the following technologies:

- Node.js: A JavaScript runtime environment that executes server-side code.
- Express.js: A web application framework for Node.js used to build APIs and handle HTTP requests.
- MongoDB: A NoSQL database used to store the application data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js used to define schemas and interact with the database.
- JSON Web Tokens (JWT): A standard for creating access tokens that are used for authentication and authorization.

## Getting Started
To set up and run the Blogging Site Mini Project on your local machine, follow these steps:

### Prerequisites
Make sure you have the following software installed on your system:

- Node.js: Download and install Node.js from the official website (https://nodejs.org).
- MongoDB: Download and install MongoDB from the official website (https://www.mongodb.com).

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd blogging-site-mini-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the project root directory and set the following environment variables:
   ```
   PORT=<port-number>
   string=<mongodb-uri>
   Sceret_key=<jwt-secret>
   ```

### Running the Application
1. Start the MongoDB server:
   ```
   mongod
   ```
2. Start the application server:
   ```
   npm start
   ```
3. The application will be accessible at `http://localhost:<port-number>`

## API Documentation

### Authors

#### Create an Author
- **URL:** `/authors`
- **Method:** `POST`
- **Description:** Creates a new author.
- **Request Body:**
  - `fname` (required): First name of the author.
  - `lname` (required): Last name of the author.
  - `title` (required): Title of the author (enum: "Mr", "Mrs", "Miss").
  - `email` (required): Email address of the author (must be unique and valid).
  - `password` (required): Password of the author.
- **Response:**
  - `status` (boolean): Indicates whether the request was successful.
  - `data` (object): The created author document.
- **Example:**
  ```json
  {
    "fname": "John",
    "lname": "Doe",
    "title": "Mr",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Blogs

#### Create a Blog
- **URL:** `/blogs`
- **Method:** `POST`
- **Description:** Creates a new blog.
- **Request Body:**
  - `title` (required): Title of the blog.
  - `body

` (required): Body/content of the blog.
  - `authorId` (required): ID of the author who created the blog.
  - `tags` (optional): Array of tags associated with the blog.
  - `category` (required): Category of the blog.
  - `subcategory` (optional): Array of subcategories associated with the blog.
- **Response:**
  - `status` (boolean): Indicates whether the request was successful.
  - `data` (object): The created blog document.
- **Example:**
  ```json
  {
    "title": "Getting Started with Node.js",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "authorId": "609dbcbdd4e8e538dcf429d2",
    "tags": ["Node.js", "JavaScript"],
    "category": "Technology",
    "subcategory": ["Web Development", "Backend"]
  }
  ```

#### Get Blogs
- **URL:** `/blogs`
- **Method:** `GET`
- **Description:** Retrieves all published blogs or filters blogs based on query parameters.
- **Query Parameters:**
  - `authorId` (optional): Filters blogs by author ID.
  - `category` (optional): Filters blogs by category.
  - `tags` (optional): Filters blogs by tags (comma-separated list).
  - `subcategory` (optional): Filters blogs by subcategories (comma-separated list).
- **Response:**
  - `status` (boolean): Indicates whether the request was successful.
  - `data` (array): Array of blog documents.
- **Example:**
  - Get all published blogs:
    ```
    GET /blogs
    ```
  - Filter blogs by author ID and category:
    ```
    GET /blogs?authorId=609dbcbdd4e8e538dcf429d2&category=Technology
    ```

#### Update a Blog
- **URL:** `/blogs/:blogId`
- **Method:** `PUT`
- **Description:** Updates an existing blog.
- **Path Parameters:**
  - `blogId`: ID of the blog to update.
- **Request Body:**
  - `title` (optional): New title of the blog.
  - `body` (optional): New body/content of the blog.
  - `tags` (optional): Additional tags to add to the blog (array).
  - `subcategory` (optional): Additional subcategories to add to the blog (array).
  - `published` (optional): Set to `true` to publish the blog.
- **Response:**
  - `status` (boolean): Indicates whether the request was successful.
  - `data` (object): The updated blog document.
- **Example:**
  ```json
  {
    "title": "Updated Title",
    "body": "Updated body content",
    "tags": ["Node.js", "JavaScript", "Web Development"],
    "subcategory": ["Backend"],
    "published": true
  }
  ```

#### Delete a Blog
- **URL:** `/blogs/:blogId`
- **Method:** `DELETE`
- **Description:** Deletes an existing blog.
- **Path Parameters:**
  - `blogId`: ID of the blog to delete.
- **Response:**
  - `status` (boolean): Indicates whether the request was successful.
- **Example:**
  ```
  DELETE /blogs/609dbcbdd4e8e538dcf429d3
  ```

## Conclusion
The Blogging Site Mini Project provides a basic blogging platform with features for author management, blog creation, editing, deletion, and viewing published blogs. The project can be

 further enhanced by adding authentication and authorization to ensure secure access to the blogging functionalities. With the provided API documentation, developers can start implementing the project and customize it according to their specific requirements.