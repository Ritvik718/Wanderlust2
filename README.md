# Wanderlust

## Description

This project is a web application designed for users to showcase their properties, making them available for others to explore. It encompasses both front-end, back-end, and database components, all organized using the MVC (Model-View-Controller) architecture.

## Table of Contents

1. [Description](#description)
2. [Website](#website)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Database](#database)
8. [Authentication and Authorization](#authentication-and-authorization)
9. [Frontend](#frontend)
10. [Error Handling](#error-handling)
11. [Maps Integration](#maps-integration)
12. [Cloudinary](#cloudinary)

 ## Website

[Wanderlust](https://wanderlust-5pen.onrender.com/listings)

## Features

- User registration and login.
- Creating, editing, and deleting property listings.
- Adding and deleting reviews for listings.
- Ensuring that only the owner of a listing can make changes.
- Providing property details, including title, description, image uploads, pricing, and location.
- Leveraging Mapbox for displaying property locations on maps.
- Implementing comprehensive error handling.
- Crafting an interactive and responsive frontend.
## Tech Stack

- JavaScript
- Node.js
- Express.js
- CSS
- EJS (Embedded JavaScript)
- MongoDB (Database)
- Mapbox API (for mapping)
- Cloudinary API (for image storage)

## Installation

1. Clone this repository.

```bash
  git clone https://github.com/Ritvik718/Wanderlust.git
```

2. Install project dependencies.
```bash
  npm install
```

3. Set up your MongoDB database.

4. Configure environment variables as needed.

5. Start the server.
```bash
  node app.js
```
## Usage

1. Register or log in to your account.

2. Add property listings with details, including title, description, images, pricing, and location.

3. Edit or delete your listings as needed.

4. Add and delete reviews for property listings.

5. Only the owner of a listing can modify or delete it, ensuring proper authorization.

## Database

For local development and testing, the project is set up to use MongoDB. You don't need to worry about MongoDB Atlas unless you intend to host the project in the cloud. To run the project on your local environment, ensure that MongoDB is properly installed and configured, and you'll only need the local MongoDB connection URL.

## Authentication and Authorization

Authentication and authorization are implemented to protect the integrity of the listings and reviews. Only the owner of a listing can make modifications.


## Frontend

The frontend of this project is designed with a user-friendly interface, focusing on an elegant and intuitive user experience. It features a responsive design to ensure that users can access and interact with the website seamlessly across various devices.


## Error Handling

Comprehensive error handling is implemented to handle various situations, ensuring a smooth user experience.

## Maps Integration

The application integrates Mapbox to display property locations on maps, enhancing the user experience.

## Cloudinary 
The project utilizes Cloudinary for image storage and management. Cloudinary offers a cloud-based solution for uploading, storing, optimizing, and delivering images and videos. It simplifies the process of handling media assets, ensuring fast and reliable image delivery for a seamless user experience.

