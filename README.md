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

## Demo Video

A demo of the application can be viewed [here](https://sendspark.com/share/x125621pevwi0v97vpg9n9bhr9u1nqj5).

## Installation and Setup

Provide instructions on how to install and set up the application. This might include steps to clone the repo, install dependencies, set up the database, and run the application locally.

```bash
# Clone the repository
git clone [repository URL]

# Navigate to the repository directory
cd [repository directory]

# Install dependencies
npm install

# Set up the database
[Database setup instructions]

# Run the application
npm run dev
