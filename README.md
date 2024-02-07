# Social Media Web App

## Description

This application is a basic social media platform that allows users to interact with posts through functionalities like liking, disliking, updating, and deleting. It's designed with a user-friendly interface and focuses on providing an efficient and engaging user experience.

## Features

- **View Posts:** Users can view posts from all users. Pagination is implemented to avoid loading all posts at once.
- **View Personal Posts:** Users can view their own posts, also with pagination.
- **Search Posts:** Allows users to search for specific posts.
- **Update Posts:** Users can edit and update their own posts.
- **Delete Posts:** Users can delete their own posts.
- **Like/Dislike Posts:** Functionality to like or dislike posts.
- **User Authentication:** Includes Login, Signup, and Logout features. New users can sign up, and posts are associated with the logged-in user.

## Tech Stack

- **React Query:** Used for managing server state.
- **Axios:** For data fetching.
- **Next.js:** React framework for production.
- **Tailwind CSS:** For styling, without vanilla CSS or any UI libraries.
- **Zustand:** For global state management.
- **ExpressJS:** Backend framework.
- **PostgreSQL:** Database.


## Installation and Setup

1. To start  Client 

```bash
git clone the repo
cd next2
npm i
npm run dev
```

- For Login Details use - username and password
2. To setup Database
```bash
cd server
cd db
-add the following info
  user: "yourUser",
  host: "localhost",
  database: "yourdbName",
  password: "yourPsqlPassword",
  port: 5432, // Default PostgreSQL port
```
3. To start server

```bash
cd server
npm install
npm run dev
```
