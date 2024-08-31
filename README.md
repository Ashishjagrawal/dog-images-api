
# Dog Picture API

A simple RESTful API for managing dog pictures, including uploading, retrieving, updating, and deleting images. This API is built with Node.js, Express, and TypeScript, and includes Swagger documentation for easy integration.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features

- Upload dog images
- Retrieve a dog image by ID
- Retrieve all dog images or a specific picture by ID
- Update existing dog pictures
- Delete dog pictures
- Authenticated routes using Bearer tokens
- Swagger documentation for API endpoints

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:

   ```bash
   cd dog-pic-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

## Configuration

1. Create a `.env` file in the root directory and set the following environment variables:

   ```env
   PORT=9000
   MONGO_URI=<your-mongodb-connection-string>
   MONGO_URI_TESTS=<your-mongodb-connection-string-for-unit-tests>
   JWT_SECRET=<your-jwt-secret>
   ```

2. Replace `<your-mongodb-connection-string>` with your MongoDB connection string and `<your-jwt-secret>` with your secret key for JWT authentication.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:9000` by default.

2. Access Swagger documentation at `http://localhost:9000/docs` to interact with the API endpoints.

## API Endpoints

### Authentication

- **POST** `/auth/register`: register a user
- **POST** `/auth/login`: Authenticate user and receive a Bearer token

### `/api/dogs`

- **POST** `/api/dogs`: Upload a dog image (Requires Bearer token)
- **GET** `/api/dogs`: Retrieve all dog images
- **GET** `/api/dogs/:id`: Retrieve a dog image by ID
- **PUT** `/api/dogs/:id`: Update a dog image by ID (Requires Bearer token)
- **DELETE** `/api/dogs/:id`: Delete a dog image by ID (Requires Bearer token)


## Testing

Run tests with:

```bash
npm run test
```

## Logs

Error logs will be saved in logs folder
